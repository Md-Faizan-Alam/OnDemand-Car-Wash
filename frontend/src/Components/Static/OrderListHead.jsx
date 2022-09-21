const OrderListHead = (props) => {
    return (
        <>
            <div
                className="container-fluid bg-gradient rounded py-3 mb-3"
                style={{
                    backgroundColor: "rgba(25,135,84,0.6)",
                    fontWeight: 600,
                }}
            >
                <div className="row text-center">
                    <div className="col-1">#</div>
                    <div className="col">Date</div>
                    <div className="col">Wash Pack</div>
                    <div className="col">Car</div>
                    <div className="col">Amount</div>
                    <div className="col-2">Status</div>
                </div>
            </div>
        </>
    );
};

export default OrderListHead;
