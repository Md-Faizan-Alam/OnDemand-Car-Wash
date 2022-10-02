import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { setModalState } from "../../Actions/ModalStateAction";
import Toolbox from "../../Services/Toolbox";

const PackItem = (props) => {

    const dispatch = useDispatch();

    const imageStyle = {
        height: "25vh",
        backgroundImage: `url(/pack-images/${props.pack.title.replaceAll(
            " ",
            "_"
        )}.jpg)`,
        backgroundSize: "cover",
    };

    const boxStyle = {
        height: "max-content",
        width: "40vh",
        fontFamily: "Arial",
    };

    const DeleteButton = () => {
        return (
            <button
                className="btn btn-outline-danger h-25 me-1 mt-1 fs-6 p-0"
                style={{ width: "20%" }}
                onClick={() => {
                    dispatch(
                        setModalState({
                            header: "Delete Wash Pack",
                            body: "Are you sure you want to delete this Wash Pack ?",
                            task: "deleteWashPack",
                            payload: props.pack.id,
                        })
                    );
                }}
                data-bs-toggle="modal"
                data-bs-target="#myModal"
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
        );
    };

    const PriceTag = () => {
        return (
            <span
                className="badge bg-primary h-25 fs-5"
                style={{
                    width: "max-content",
                    borderRadius: "0% 0% 15px 0%",
                }}
            >
                Rs.{props.pack.price}
            </span>
        );
    };

    return (
        <>
            <div
                className="container bg-light shadow rounded mx-3 my-2 border"
                style={boxStyle}
            >
                <div className="row justify-content-between" style={imageStyle}>
                    <PriceTag />
                    {props.delete ? <DeleteButton /> : null}
                </div>
                <div className="row fs-5 ps-2 mt-2">{props.pack.title}</div>
                <div className="row ps-2 mt-1" style={{ fontSize: "13px" }}>
                    {Toolbox.truncateText(props.pack.description)}...
                </div>
                <div className="row justify-content-end">
                    <button
                        onClick={() => props.handleAction(props.pack.id)}
                        className="btn btn-outline-success fs-6  m-3"
                        style={{ width: "fit-content" }}
                    >
                        {props.action}
                    </button>
                </div>
            </div>
        </>
    );
};

export default PackItem;
