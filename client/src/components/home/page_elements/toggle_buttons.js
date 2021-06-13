export default function ToggleBts(props) {
    return (
        <div className="toggle-btns">
            <button className={props.term === "long_term"? "btn-active paragraph": "paragraph"} 
                onClick={() => props.set_term("long_term")}>All Time</button>
            <button className={props.term === "medium_term"? "btn-active paragraph": "paragraph"} 
                onClick={() => props.set_term("medium_term")}>Last 6 Months</button>
            <button className={props.term === "short_term"? "btn-active paragraph": "paragraph"}
                onClick={() => props.set_term("short_term")}>Last 4 Weeks</button>
        </div>
    )
}