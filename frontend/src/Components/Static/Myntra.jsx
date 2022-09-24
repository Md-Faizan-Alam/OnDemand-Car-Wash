const Myntra = (props) => {
    return (
        <>
            <div className="container-fluid" style={{ height: "100vh" }}>
                <div
                    className="container"
                    style={{ height: "100vh", width: "70%" }}
                >
                    <div className="row fw-bold py-3 border-bottom">
                        Account
                        <div
                            className="row fw-lighter"
                            style={{ fontSize: "12px" }}
                        >
                            Jaita Kapuria
                        </div>
                    </div>
                    <div className="row" style={{ height: "100vh" }}>
                        <div className="col-2 pe-5">
                            <div className="row fw-light border-bottom py-4">
                                Overview
                            </div>
                            <div className="row fw-light border-bottom py-4">
                                <div
                                    className="row py-2"
                                    style={{ fontSize: "12px" }}
                                >
                                    ORDERS
                                </div>
                                <div
                                    className="row"
                                    style={{ fontSize: "12px" }}
                                >
                                    Orders & Returns
                                </div>
                            </div>
                        </div>
                        <div className="col p-3 border-start">
                            <div
                                className="container border"
                                style={{ height: "90vh" }}
                            >
                                <div
                                    className="row w-50 m-auto"
                                    style={{ height: "90vh" }}
                                >
                                    <div className="col">
                                        <div className="row fw-bold border-bottom ps-4 pt-5 pb-4">
                                            Profile Details
                                        </div>
                                        <div
                                            className="row pt-4"
                                            style={{ height: "60vh" }}
                                        >
                                            <div className="row ps-4">
                                                <div className="col-4">
                                                    Full Name
                                                </div>
                                                <div className="col-8">
                                                    Jaita Kapuria
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <button className="btn btn-danger">
                                                Edit
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Myntra;
