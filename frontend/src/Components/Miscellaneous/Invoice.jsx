import { useEffect } from "react";

const Invoice = (props) => {
    const order = JSON.parse(localStorage.getItem("order"));
    let serial = 0;

    useEffect(() => {
        window.addEventListener('afterprint',()=>{
            window.close();
            localStorage.removeItem("order");
        })
        window.print();
    }, []);

    return (
        <>
            <div
                className="container-fluid mt-2 px-5"
                style={{ width: "100vw" }}
            >
                <div className="row fs-1">
                    <div
                        className="col text-success"
                        style={{ fontFamily: "Bree Serif" }}
                    >
                        Green Wash
                    </div>
                    <div className="col text-end fw-bold pe-5">Invoice</div>
                </div>

                <div className="row fs-4 pe-5 mt-3">
                    <div className="col text-end">
                        Date:{" "}
                        <div className="d-inline" id="date">
                            {order.date}
                        </div>
                    </div>
                </div>

                <div className="row fs-3 pe-5 mt-3">
                    <div className="col-1">Name:</div>
                    <div className="col" id="name">
                        {order.customerName}
                    </div>
                </div>
                <div className="row fs-3 pe-5">
                    <div className="col-1">Email:</div>
                    <div className="col" id="email">
                        {order.email}
                    </div>
                </div>
                <div className="row fs-3 pe-5">
                    <div className="col-1">Phone:</div>
                    <div className="col" id="phoneNumber">
                        {order.phoneNumber}
                    </div>
                </div>

                <div
                    className="row fs-4 mt-5 border border-dark border-2"
                    style={{ fontWeight: "500" }}
                >
                    <div className="col-1 border-dark border-end">S.No.</div>
                    <div className="col-3 border-dark border-end">Item</div>
                    <div className="col border-dark border-end">
                        Description
                    </div>
                    <div className="col-2">Price (Rs.)</div>
                </div>

                {order.list.map((element) => {
                    serial++;
                    return (
                        <div className="row fs-4 border-bottom border-dark border-2 border-start border-end">
                            <div className="col-1 border-dark border-end text-center">
                                {serial}
                            </div>
                            <div className="col-3 border-dark border-end">
                                {element.title}
                            </div>
                            <div className="col border-dark border-end">
                                {element.description}
                            </div>
                            <div className="col-2">{element.price}</div>
                        </div>
                    );
                })}

                {/* <div id="packList">
                    <div className="row fs-4 border-bottom border-dark border-2 border-start border-end">
                        <div className="col-1 border-dark border-end text-center">
                            1
                        </div>
                        <div className="col-3 border-dark border-end">
                            {pack.title}
                        </div>
                        <div className="col border-dark border-end">
                            {pack.description}
                        </div>
                        <div className="col-2">{pack.price}</div>
                    </div>
                </div> */}

                <div className="row fs-4">
                    <div className="col text-end">Amount:</div>
                    <div className="col-2" id="amount">
                        {order.amount}
                    </div>
                </div>

                <div className="row border-top border-dark border-2 mt-5"></div>
            </div>
        </>
    );
};

export default Invoice;
