import { useDispatch } from "react-redux";
import { setModalState } from "../../Actions/ModalStateAction";
import Mapping from "../../Constants/Mapping";
import Toolbox from "../../Services/Toolbox";
import OrderAction from "../Minors/OrderAction";
import StatusIndicator from "../Minors/StatusIndicator";

const OrderBlock = (props) => {
    const dispatch = useDispatch();

    const handleAction = (modalState) => {
        return () => {
            dispatch(
                setModalState({
                    ...modalState,
                    payload: props.order,
                })
            );
        };
    };

    return (
        <div
            className="container-fluid bg-gradient rounded py-3 mb-1 fw-semibold"
            style={{
                backgroundColor: "rgba(170, 170, 170, 0.8)",
            }}
        >
            <div className="row text-center">
                <div className="col-1">{props.serial}</div>
                <div className="col">
                    {Toolbox.timeToDate(props.order.bookingTime)}
                </div>
                <div className="col">{props.order.washPackTitle}</div>
                <div className="col">{props.order.carName}</div>
                <div className="col">{props.order.amount}</div>
                <div className="col-2 dropdown">
                    <StatusIndicator status={props.order.status} />
                    <ul className="dropdown-menu drop-block border-0 text-center">
                        {Mapping.orderActions.map((element) => {
                            return (
                                <li key={element.actionName}>
                                    <OrderAction
                                        color={element.color}
                                        actionName={element.actionName}
                                        onClick={handleAction(
                                            element.modalState
                                        )}
                                        allowedStatus={element.allowedStatus}
                                        status={props.order.status}
                                        allowedRoles={element.allowedRoles}
                                        role={props.role}
                                    />
                                </li>
                            );
                        })}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default OrderBlock;
