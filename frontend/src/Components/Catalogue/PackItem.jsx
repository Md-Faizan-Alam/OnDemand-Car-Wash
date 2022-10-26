import { useDispatch } from "react-redux";
import { setModalState } from "../../Actions/ModalStateAction";
import Toolbox from "../../Services/Toolbox";
import DeleteButton from "../Minors/DeleteButton";
import PriceTag from "../Minors/PriceTag";

const PackItem = (props) => {
    const dispatch = useDispatch();

    const imageStyle = {
        height: "25vh",
        backgroundImage: Toolbox.titleToUrl(props.pack.title),
        backgroundSize: "cover",
    };

    const boxStyle = {
        height: "max-content",
        width: "40vh",
        fontFamily: "Arial",
    };

    const handleDelete = () => {
        dispatch(
            setModalState({
                header: "Delete Wash Pack",
                body: "Are you sure you want to delete this Wash Pack ?",
                task: "deleteWashPack",
                payload: props.pack.id,
            })
        );
    };

    return (
        <div
            className="container shadow rounded my-3 mx-2 border"
            style={boxStyle}
        >
            <div
                className="row justify-content-between position-relative"
                style={imageStyle}
            >
                <PriceTag price={props.pack.price} />
                <DeleteButton
                    onClick={handleDelete}
                    visible={props.delete}
                    className={"position-absolute end-0"}
                />
            </div>
            <div className="row fs-5 ps-2 mt-2">{props.pack.title}</div>
            <div className="row ps-2 mt-1" style={{ fontSize: "13px" }}>
                {Toolbox.truncateText(props.pack.description)}...
            </div>
            <div className="row justify-content-end">
                <button
                    onClick={() => props.handleAction(props.pack.id)}
                    className="btn btn-outline-success fs-6  m-3 w-fit"
                >
                    {props.action}
                </button>
            </div>
        </div>
    );
};

export default PackItem;
