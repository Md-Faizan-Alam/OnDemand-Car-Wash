const PriceTag = (props) => {
    return (
        <span
            className="badge bg-primary h-25 fs-5"
            style={{
                width: "max-content",
                borderRadius: "0% 0% 15px 0%",
            }}
        >
            Rs.{props.price}
        </span>
    );
};

export default PriceTag;
