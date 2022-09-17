import { useDispatch } from "react-redux";
import orderList from "../../Constants/OrderList";
import OrderBlock from "./OrderBlock";
import setOrderStage from '../../Actions/OrderStageAction';

const OrderList = (props) => {

    const dispatch = useDispatch();

    let serial = 0;

    return (
        <div className="container p-5 tab-component">
            <div className="container-fluid p-0 rounded">
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

                {orderList.map((order) => {
                    serial++;
                    return <OrderBlock serial={serial} order={order} />;
                })}

                <div className="container-fluid py-2 mt-4 d-flex flex-row-reverse">
                    <button className="btn btn-outline-success" onClick={()=>dispatch(setOrderStage("book"))}>Book Now</button>
                </div>
                
            </div>
        </div>
    );
};

export default OrderList;
