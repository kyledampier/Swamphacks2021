import requests
import os
import time
import json
from datetime import datetime
from flask import Flask, request, jsonify
from flask_cors import CORS
from threading import Thread

app = Flask(__name__)
CORS(app, resources={r"*": {"origins": "*"}})

api_key = os.environ.get('ASSEMBLY_AI_API_KEY')
downloads_folder = "./downloads"

headers = {'authorization': api_key}  # Assembly AI API key


@app.route('/')
def index():
    return "Endpoint for SwampHacks 2021<br/> POST /transcript"


@app.route('/transcript', methods=['POST'])
async def get_zoom_url(downloads_folder=downloads_folder, headers=headers):
    if request.method != 'POST':
        return "Error: Expected POST request"

    # check if downloads folder exists
    if not os.path.exists(downloads_folder):
        os.makedirs(downloads_folder)

    zoom_url = request.json['zoom_url']
    print(zoom_url)
    os.chdir(downloads_folder)
    os.system(f"zoomdl -u {zoom_url} -d")
    video = os.listdir(".")[0]
    os.chdir("..")

    # export mp4 to mp3
    audio_name = os.path.join(downloads_folder, video[:-4] + '.mp3')
    video_name = os.path.join(downloads_folder, video)
    os.system(f"ffmpeg -i {video_name} {audio_name}")

    # upload mp3 to Assembly AI (https://assembly.ai/)
    def read_file(filename, chunk_size=5242880):
        with open(filename, 'rb') as _file:
            while True:
                data = _file.read(chunk_size)
                if not data:
                    break
                yield data

    response = requests.post('https://api.assemblyai.com/v2/upload',
                             headers=headers,
                             data=read_file(audio_name))
    res = response.json()

    # get transcript _id

    # authentication with Assembly AI
    endpoint = "https://api.assemblyai.com/v2/transcript"

    transcript_json = {
        "audio_url": res['upload_url'],
        "auto_chapters": True
    }

    headers = {
        "authorization": api_key,
        "content-type": "application/json"
    }

    # wait for response
    requests_folder = "requests"
    transcript = requests.post(endpoint, json=transcript_json, headers=headers)
    req_json = os.path.join(requests_folder, datetime.now().strftime(
        "%Y%m%d-%H%M%S") + '.json')
    with open(req_json, 'w') as f:
        json.dump(transcript.json(), f)
    _id = transcript.json()['id']

    # preform transcription asynchronously
    thread = Thread(target=get_zoom_transcript,
                    args=(_id, "data", headers, True))
    thread.start()

    # delete temporary files
    os.system(f"rm -rf {downloads_folder}")

    return {'code': 200, 'message': 'success', 'id': _id}


def get_zoom_transcript(_id, transcript_folder="./data/", headers=headers, loop=True):
    # polling for response
    is_finished = False
    ouput_file_name = os.path.join(transcript_folder, _id + '.json')

    while not is_finished:
        polling_response = requests.get(
            "https://api.assemblyai.com/v2/transcript/" + _id, headers=headers)
        if polling_response.json()['status'] != 'completed':
            print(polling_response.json())
            time.sleep(5)
        else:
            with open(ouput_file_name, 'w') as f:
                json.dump(polling_response.json(), f)
            print('Transcript saved to', ouput_file_name)
            is_finished = True

        if not loop:
            is_finished = True
            break

    return ouput_file_name


@app.route('/transcript/<id>', methods=['GET'])
def get_transcript_file(id, transcript_folder="./data/"):
    transcript_file = os.path.join(transcript_folder, id + '.json')

    # run model

    if os.path.exists(transcript_file):
        with open(transcript_file, 'r') as f:
            transcript = json.load(f)
        return jsonify(transcript)
    else:
        get_zoom_transcript(id, loop=False)

    return {'code': 404, 'message': 'Transcript not found'}


@app.route('/summary/<id>', methods=['GET'])
def get_summary_file(id, transcript_folder="./data/"):
    transcript_file = os.path.join(transcript_folder, id + '.json')

    # get file content
    if os.path.exists(transcript_file):
        with open(transcript_file, 'r') as f:
            transcript = json.load(f)
        # return jsonify(transcript)
    else:
        get_zoom_transcript(id, loop=False)

    return {'code': 404, 'message': 'Transcript not found'}


if __name__ == '__main__':
    # run debug server on port 3000
    app.run(debug=True, port=3000)
