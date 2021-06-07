import { Link } from "react-router-dom"
import InfoIcon from "../page_elements/info-icon";
import UserIcon from "../page_elements/user-icon"

export default function ArtistIcon(props) {
    return (
        <li>
            <Link to={`artist/${props.artist.id}`}>
                <div className="img-container">
                    <InfoIcon />
                    {props.artist.images[0]? 
                        <img className="artist-image" src={props.artist.images[0].url} />:
                        <div className="artist-image"><UserIcon /></div>
                    }

                </div>
                <div className="name-container">
                    <p className="paragraph">{props.artist.name}</p>
                </div>
            </Link>
        </li>
    )
}