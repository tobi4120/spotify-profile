export default function Error(props) {
    return (
        <div className="error">
            <p className="heading-secondary">Error: {props.type} not found!</p>
        </div>
    )
}