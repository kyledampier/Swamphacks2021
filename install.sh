# install zoomdl
sudo wget https://github.com/Battleman/zoomdl/releases/latest/download/zoomdl -O /usr/bin/zoomdl
sudo chmod +x /usr/bin/zoomdl

# create a temp directory for downloads
mkdir -p /tmp/zoomdl
mkdir -p /tmp/zoomdl/downloads

# Set environment variables
export ZOOMDL_DIR=/tmp/zoomdl
export ZOOMDL_DOWNLOAD_DIR=/tmp/zoomdl/downloads
export ASSEMBLY_AI_API_KEY=6736e31af87343a3aa6606fd80a9b072

# install python requirements
sudo pip3 install -r requirements.txt
