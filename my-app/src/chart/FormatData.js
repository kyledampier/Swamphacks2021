
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

export default function FormatData(props) {

    console.log(props.timelineData);

    return (
        <div>
            {props.timelineData.map((item, index) => {
                console.log(item);
                return (<div key={index}>
                    <h1>{item.gist}</h1>
                    <h2>{item.headline}</h2>
                    <p>{item.summary}</p>
                    <p><i>Start Time: {getFormattedTime(item.start)}, End Time: {getFormattedTime(item.end)}</i></p>
                    </div>);
            })}
        </div>
    );
}