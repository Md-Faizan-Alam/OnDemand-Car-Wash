const FeaturedCard = (props) => {



    return (
        <div
            className="card wash-pack-card"
            style={{ backgroundImage: `url(./pack-images/${props.pack.title.replaceAll(' ','_')}.jpg)` }}
            key={props.pack.id}
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

FeaturedCard.defaultProps = {
    image: "WashPack_01",
    title: "Wash Pack Title",
    description: "This is where the description of the given Add On will appear"
}
