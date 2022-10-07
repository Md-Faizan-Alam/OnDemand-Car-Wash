import { useDispatch } from "react-redux";
import { setModalState } from "../../Actions/ModalStateAction";
import Mapping from "../../Constants/Mapping";
import DataColumn from "../Minors/DataColumn";
import DeleteButton from "../Minors/DeleteButton";

const ReportBlock = (props) => {
    const dispatch = useDispatch();

    const handleDelete = () => {
        dispatch(
            setModalState({
                header: "Confirm Deletion",
                body: "Are you sure you want to delete this report ?",
                task: "deleteReport",
                payload: props.report?.id,
            })
        );
    };

    return (
        <>
            <div className="container border border-success border-2 rounded w-75 my-2">
                <div className="row p-3">
                    <div className="col-4">
                        <DataColumn
                            object={props.report}
                            fields={Mapping.reportFields.slice(0, 6)}
                        />
                    </div>
                    <div className="col">
                        <DataColumn
                            object={props.report}
                            fields={Mapping.reportFields.slice(6)}
                        />
                    </div>
                    <DeleteButton onClick={handleDelete} />
                </div>
            </div>
        </>
    );
};

export default ReportBlock;
