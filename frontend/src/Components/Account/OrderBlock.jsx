import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setModalState } from "../../Actions/ModalStateAction";
import Mapping from "../../Constants/Mapping";
import CarService from "../../Services/CarService";
import Toolbox from "../../Services/Toolbox";
import WashPackService from "../../Services/WashPackService";

const OrderBlock = (props) => {
    const [packName, setPackName] = useState();
    const [carModel, setCarModel] = useState();
    const user = useSelector(state=>state.user);

    const dispatch = useDispatch();

    const StatusIndicator = () => {
        return (
            <div
                className={"py-1 rounded dropdown-toggle"}
                role={"button"}
                data-bs-toggle="dropdown"
                style={{
                    backgroundColor: Mapping.statusColor[props.order.status],
                }}
            >
                {props.order.status}
            </div>
        );
    };

    const CancelButton = () => {
        return (
            <button
                className="btn btn-danger px-1 py-0"
                onClick={() => {
                    dispatch(
                        setModalState({
                            header: "Cancel Order",
                            body: "Are you sure you want to cancel this order ?",
                            task: "cancelOrder",
                            payload: props.order,
                        })
                    );
                }}
                data-bs-toggle="modal"
                data-bs-target="#myModal"
                style={
                    ["CANCELLED"].includes(props.order.status)
                        ? { display: "none" }
                        : undefined
                }
            >
                Cancel
            </button>
        );
    };
    const AcceptButton = () => {
        return (
            <button
                className="btn btn-success px-1 py-0"
                onClick={() => {
                    dispatch(
                        setModalState({
                            header: "Accept Order",
                            body: "Are you sure you want to accept this order ?",
                            task: "acceptOrder",
                            payload: props.order,
                        })
                    );
                }}
                data-bs-toggle="modal"
                data-bs-target="#myModal"
                style={
                    ["CANCELLED", "ACCEPTED"].includes(props.order.status)
                        ? { display: "none" }
                        : undefined
                }
            >
                Accept
            </button>
        );
    };
    const AssignButton = () => {
        return (
            <button
                className="btn btn-success px-1 py-0 shadow-sm fs-6"
                onClick={() => {
                    dispatch(
                        setModalState({
                            header: "Assign Order",
                            body: "Are you sure you want to manually assign this order to a washer of your choice ?",
                            task: "assignOrder",
                            payload: props.order,
                        })
                    );
                }}
                data-bs-toggle="modal"
                data-bs-target="#myModal"
                style={
                    ["CANCELLED", "ACCEPTED", "TERMINATED"].includes(
                        props.order.status
                    )
                        ? { display: "none" }
                        : undefined
                }
            >
                Assign
            </button>
        );
    };
    const TerminateButton = () => {
        return (
            <button
                className="btn btn-danger px-1 py-0"
                onClick={() => {
                    dispatch(
                        setModalState({
                            header: "Terminate Order",
                            body: "Are you sure you want to terminate this order ?",
                            task: "terminateOrder",
                            payload: props.order,
                        })
                    );
                }}
                data-bs-toggle="modal"
                data-bs-target="#myModal"
                style={
                    ["CANCELLED", "COMPLETED", "TERMINATED"].includes(
                        props.order.status
                    ) || ["WASHER","CUSTOMER"].includes(user.role)
                        ? { display: "none" }
                        : {}
                }
            >
                Terminate
            </button>
        );
    };

    const button = {
        CUSTOMER: <CancelButton />,
        WASHER: <AcceptButton />,
        ADMIN: <AssignButton />,
        TERMINATE: <TerminateButton />,
    };

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
                <div className="col">{Toolbox.timeToDate(props.order.bookingTime)}</div>
                <div className="col">{props.order.washPackTitle}</div>
                <div className="col">{props.order.carName}</div>
                <div className="col">{props.order.amount}</div>
                <div className="col-2 dropdown">
                    <StatusIndicator />
                    <ul className="dropdown-menu drop-block border-0 text-center">
                        <li>{button[props.role]}</li>
                        <li>{button["TERMINATE"]}</li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default OrderBlock;
