const FeaturedCard = (props) => {
    return (
        <div
            className="card wash-pack-card"
            style={{ backgroundImage: `url(./pack-images/${props.image}.jpg)` }}
            key={props.title}
        >
            <div className="card-body">
                <h5 className="card-title">{props.title}</h5>
                <p className="card-text">
                    {props.description}
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
