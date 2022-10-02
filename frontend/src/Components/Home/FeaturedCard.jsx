const FeaturedCard = (props) => {

    return (
        <div
            className="card wash-pack-card"
            style={{ backgroundImage: `url(./pack-images/${props.pack.title.replaceAll(' ','_')}.jpg)` }}
            key={props.pack.id}
            onClick={()=>props.handleAction(props.pack.id)}
        >
            <div className="card-body">
                <h5 className="card-title">{props.pack.title}</h5>
                <p className="card-text">
                    {(props.pack.description !== null) ? props.pack.description.slice(0,80) : "No description"}...
                </p>
            </div>
        </div>
    );
};

export default FeaturedCard;
