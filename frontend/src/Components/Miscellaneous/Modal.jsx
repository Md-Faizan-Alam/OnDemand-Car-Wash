import { useDispatch, useSelector } from "react-redux";
import { refreshPage } from "../../Actions/RefreshAction";
import CarService from "../../Services/CarService";
import OrderService from "../../Services/OrderService";
import ReportService from "../../Services/ReportService";
import WashPackService from "../../Services/WashPackService";

const Modal = (props) => {
    const user = useSelector(state=>state.user);
    const modalState = useSelector(state=>state.modalState)
    const dispatch = useDispatch();

    const getColor = (action)=>{
        if(["Accept","Assign"].includes(action)){
            return "success";
        }else{
            return "danger";
        }
    }

    const handleDelete = async () => {
        await CarService.deleteCarById(modalState.payload);
        dispatch(refreshPage());
    };

    const handleCancel = async ()=>{
        let cancelledOrder = {
            ...modalState.payload,
            status: "CANCELLED"
        }
        await OrderService.updateOrder(cancelledOrder);
        dispatch(refreshPage());
    }

    const handleAccept = async ()=>{
        let acceptedOrder = {
            ...modalState.payload,
            status: "ACCEPTED",
            washerId: user.userId,
        }
        console.log(acceptedOrder)
        await OrderService.updateOrder(acceptedOrder);
        dispatch(refreshPage());
    }
    const handleAssign = async ()=>{
        let acceptedOrder = {
            ...modalState.payload,
            status: "ACCEPTED",
        }
        await OrderService.updateOrder(acceptedOrder);
        dispatch(refreshPage());
    }
    
    const deleteWashPack = async ()=>{
        await WashPackService.deleteWashPack(modalState.payload);
        dispatch(refreshPage());
    }
    
    const handleTerminate = async ()=>{
        let terminatedOrder = {
            ...modalState.payload,
            status: "TERMINATED",
        }
        await OrderService.updateOrder(terminatedOrder);
        dispatch(refreshPage());
    }

    const deleteReport = async ()=>{
        await ReportService.deleteReportById(modalState.payload);
        dispatch(refreshPage())
    }

    const handler = {
        doNothing: [()=>{},"Do Nothing"],
        deleteCar: [handleDelete, "Delete"],
        cancelOrder: [handleCancel, "Cancel"],
        acceptOrder: [handleAccept, "Accept"],
        assignOrder: [handleAssign, "Assign"],
        deleteWashPack: [deleteWashPack, "Delete"],
        terminateOrder: [handleTerminate, "Terminate"],
        deleteReport: [deleteReport, "Delete"]
    }

    return (
        <>
            <div
                className="modal fade"
                id="myModal"
                tabIndex="-1"
                aria-labelledby="myModalLabel"
                aria-hidden="true"
            >
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="py-3 ps-4">
                            <h5>{modalState.header}</h5>
                        </div>
                        <div className="py-4 ps-5 fs-5">
                            {modalState.body}
                        </div>
                        <div className="py-3 ps-4 d-flex justify-content-end">
                            <button
                                type="button"
                                className={`btn btn-outline-${getColor(handler[modalState.task][1])} me-3`}
                                onClick={handler[modalState.task][0]}
                                data-bs-dismiss="modal"
                            >
                               Yes
                            </button>
                            <button
                                type="button"
                                className="btn btn-outline-success me-3"
                                data-bs-dismiss="modal"
                            >
                                No
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Modal;
