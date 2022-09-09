const FeaturedCard = (props) => {
    return (
        <div
            className="card wash-pack-card"
            style={{ backgroundImage: `url(./pack-images/${props.image}.jpg)` }}
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
