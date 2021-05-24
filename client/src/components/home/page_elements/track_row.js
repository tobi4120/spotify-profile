import { convert_mil } from "../helper_functions";

export default function TrackRow(props) {
    return (
        <div className="track-row">
            <a href={`/track/${props.track.id}`}>
                <img src={props.track.album.images && props.track.album.images[2].url} />
                <p>{props.track.name}</p>
                <p>{props.track.artists[0].name} &middot; {props.track.album.name}</p>
                <p>{convert_mil(props.track.duration_ms)}</p>
            </a>
        </div>
    )
}