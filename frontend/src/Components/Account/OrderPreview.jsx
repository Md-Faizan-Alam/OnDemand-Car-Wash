import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import setOrderStage from "../../Actions/OrderStageAction";
import Toolbox from "../../Services/Toolbox";

const OrderPreview = (props) => {
    const dispatch = useDispatch();
    const order = JSON.parse(localStorage.getItem("order"));

    return (
        <>
            <div className="container py-5">
                <div className="row">
                    <div className="col-5">
                        <div className="row user-info-row border-top border-2 border-success">
                            <div className="row text-success">Name</div>
                            <div className="row fs-4 placeholder-glow">
                                {Toolbox.loadString(order.car)}
                            </div>
                        </div>
                        <div className="row user-info-row">
                            <div className="row text-success">Wash Pack</div>
                            <div className="row fs-4 placeholder-glow">
                                {Toolbox.loadString(order.pack)}
                            </div>
                        </div>
                        <div className="row user-info-row">
                            <div className="row text-success">Amount</div>
                            <div className="row fs-4 placeholder-glow">
                                {Toolbox.loadString(order.amount)}
                            </div>
                        </div>
                    </div>
                    <div className="col">
                        <div className="row user-info-row border-top border-2 border-success">
                            <div className="row text-success">Add-Ons</div>
                            <div className="row fs-4 placeholder-glow">
                                {order?.addOnList.map((element) => {
                                    return (
                                        <div key={element}>
                                            {Toolbox.loadString(element)} <br />
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col d-flex justify-content-center">
                        <Link
                            to={"/invoice"}
                            target={"_blank"}
                            className="btn btn-outline-success mt-4"
                            onClick={()=>dispatch(setOrderStage("view"))}
                        >
                            Print
                        </Link>
                    </div>
                </div>
            </div>
        </>
    );
};

export default OrderPreview;
