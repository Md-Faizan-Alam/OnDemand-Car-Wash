import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setModalState } from "../../Actions/ModalStateAction";
import Toolbox from "../../Services/Toolbox";
import ReportRow from "./ReportRow";

const ReportBlock = (props) => {
    const dispatch = useDispatch();
    const DeleteButton = () => {
        return (
            <div className="col-1">
                <button
                    className="btn btn-outline-danger p-2 pt-1"
                    data-bs-toggle="modal"
                    data-bs-target="#myModal"
                    onClick={ async (event) => {
                        dispatch(
                            setModalState({
                                header: "Confirm Deletion",
                                body: "Are you sure you want to delete this report ?",
                                task: "deleteReport",
                                payload: props.report.reportId,
                            })
                        );
                    }}
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        fill="currentColor"
                        className="bi bi-trash3"
                        viewBox="0 0 16 16"
                    >
                        <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5ZM11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H2.506a.58.58 0 0 0-.01 0H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1h-.995a.59.59 0 0 0-.01 0H11Zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5h9.916Zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47ZM8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5Z" />
                    </svg>
                </button>
            </div>
        );
    };

    return (
        <>
            <div className="container border border-success border-2 rounded w-75 my-2">
                <div className="row p-3">
                    <div className="col-4">
                        <ReportRow
                            field={"Date"}
                            data={Toolbox.timeToDate(props.report?.computedOn)}
                        />
                        <ReportRow
                            field={"Cars"}
                            data={props.report?.increaseInCars}
                        />
                        <ReportRow
                            field={"Customers"}
                            data={props.report?.increaseInCustomers}
                        />
                        <ReportRow
                            field={"Washers"}
                            data={props.report?.increaseInWashers}
                        />
                        <ReportRow
                            field={"Orders Placed"}
                            data={props.report?.ordersPlaced}
                        />
                        <ReportRow
                            field={"Revenue"}
                            data={props.report?.revenue}
                        />
                    </div>
                    <div className="col">
                        <ReportRow
                            field={"Most Popular Pack"}
                            data={props.report?.mostPopularWashPack}
                        />
                        <ReportRow
                            field={"Most Popular Add-On"}
                            data={props.report?.mostPopularAddOn}
                        />
                        <ReportRow
                            field={"Least Popular Pack"}
                            data={props.report?.leastPopularWashPack}
                        />
                        <ReportRow
                            field={"Least Popular Add-On"}
                            data={props.report?.leastPopularAddOn}
                        />
                    </div>
                    <DeleteButton />
                </div>
            </div>
        </>
    );
};

export default ReportBlock;
