const OrderBlock = (props) => {

    const color = {
        "PENDING": "rgb(240 235 30)",
        "IN-PROCESS": "#1d7cc9",
        "COMPLETED": "rgb(100 231 45)",
        "CANCELLED": "rgb(255, 49, 49)",
        "TERMINATED": "rgb(255 0 0)"
    }

    return (
        <div
            className="container-fluid bg-gradient rounded py-3 mb-1"
            style={{
                backgroundColor: "rgba(170, 170, 170, 0.8)",
                fontWeight: 600,
            }}
        >
            <div className="row text-center">
                <div className="col-1">{props.serial}</div>
                <div className="col">{props.order.bookingTime}</div>
                <div className="col">{props.order.washPack}</div>
                <div className="col">{props.order.car}</div>
                <div className="col">{props.order.amount}</div>
                <div className="col-2">
                    <div className="py-1 rounded" style={{backgroundColor: color[props.order.status]}}>{props.order.status}</div>
                </div>
            </div>
        </div>
    );
};

export default OrderBlock;
