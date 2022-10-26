const PriceButton = (props) => {
    return (
        <div className="row w-fit m-auto text-nowrap">
            <div className="btn-group-vertical">
                {props.priceList.map((price) => (
                    <button
                        key={price}
                        onClick={() =>
                            props.setFilter((prevFilter) => ({
                                ...prevFilter,
                                [props.name]: price,
                            }))
                        }
                        className={`btn filter-tab p-0 px-2 border border-success border-2 ${
                            props.filter[props.name] === price
                                ? "bg-success text-light"
                                : ""
                        }`}
                    >
                        Rs. {price}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default PriceButton;
