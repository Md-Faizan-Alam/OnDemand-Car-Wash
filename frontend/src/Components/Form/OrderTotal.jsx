const OrderTotal = (props) => {
    return (
        <>
            <div className="container mb-5">
                <div className="row user-info-row ">
                    <div className="row text-success">Total</div>
                    <div className="row fs-4 placeholder-glow">
                        Rs. {props.total}
                    </div>
                </div>
            </div>
        </>
    );
};

export default OrderTotal;
