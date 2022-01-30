
function getFormattedTime(millisecs) {
    let d = new Date(millisecs);
    let hh = d.getUTCHours();
    let m = d.getMinutes();
    let s = d.getSeconds();

    let hours = "" + hh;
    let minutes = "" + m;
    let seconds = "" + s;

    return hours.padStart(2, '0') + ":" + minutes.padStart(2, '0') + ":" + seconds.padStart(2, '0');
}

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

export default function FormatData(props) {

    console.log(props.timelineData);

    return (
        <div>
            {props.timelineData.map((item, index) => {
                console.log(item);
                return (<div key={index}>
                    <h1 style={{ 'color': 'white'}}>{index + 1}{": "}{capitalizeFirstLetter(item.gist)}</h1>
                    <ul>
                        <h2 style={{ 'color': 'white'}}>{item.headline}</h2>
                        <ul>
                            <p style={{ 'color': 'white'}}>{item.summary}</p>
                            <p style={{ 'color': 'white'}}><i>Start Time: {getFormattedTime(item.start)}, End Time: {getFormattedTime(item.end)}</i></p>
                        </ul>
                     </ul>
                  </div>);
            })}
        </div>
    );
}