import { useDispatch } from "react-redux";
import { setCarId } from "../../Actions/CurrentOrderAction";
import setOrderStage from "../../Actions/OrderStageAction";
import Toolbox from "../../Services/Toolbox";
import CarService from "../../Services/CarService";
import { setModalState } from "../../Actions/ModalStateAction";

const CarBlock = (props) => {
    const dispatch = useDispatch();

    const selectCar = () => {
        dispatch(setCarId(props.car.carId));
        dispatch(setOrderStage("book"));
    };

    const SelectButton = () => {
        return (
            <div className="row justify-content-end pe-5">
                <button
                    className="btn btn-success w-25 text-center p-0 mb-3"
                    onClick={selectCar}
                >
                    Select
                </button>
            </div>
        );
    };

    const DeleteButton = () => {
        return (
            <button className="btn btn-outline-danger px-2 py-0 pb-1 mb-1 d-block mt-2 delete-button">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    className="bi bi-trash3"
                    viewBox="0 0 16 16"
                    onClick={ async (event) => {
                        dispatch(
                            setModalState({
                                header: "Confirm Deletion",
                                body: "Are you sure you want to delete this car ?",
                                task: "deleteCar",
                                id: props.car.carId,
                            })
                        );
                    }}
                    data-bs-toggle="modal"
                    data-bs-target="#myModal"
                >
                    <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5ZM11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H2.506a.58.58 0 0 0-.01 0H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1h-.995a.59.59 0 0 0-.01 0H11Zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5h9.916Zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47ZM8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5Z" />
                </svg>
            </button>
        );
    };

    

    return (
        <div
            className="container shadow border border-2 rounded border-dark mb-4"
            style={{
                width: "35vw",
                backgroundColor: "rgba(5, 181, 34, 0.6)",
                height: "max-content",
            }}
        >
            <div className="row" style={{ height: "max-content" }}>
                <div
                    className="col-5"
                    style={{
                        backgroundImage: `url(/images/thumbnail.webp)`,
                        backgroundSize: "cover",
                    }}
                ></div>
                <div className="col">
                    <div className="row fs-4 ps-3 my-1">
                        <div className="col p-0">{props.car.modelName}</div>
                        <div className="col-3">
                            {props.delete ? <DeleteButton /> : ""}
                        </div>
                    </div>
                    <div
                        className="row fs-6 mb-1 ms-1 "
                        style={{ width: "max-content" }}
                    >
                        Type: {Toolbox.snakeToNormal(props.car.carType)}
                    </div>

                    <div
                        className="row fs-6 mb-1 ms-1 "
                        style={{ width: "max-content" }}
                    >
                        Registration No: {props.car.registrationNumber}
                    </div>

                    <div
                        className="row align-items-center fs-6 mb-1 ms-1  py-1"
                        style={{ width: "max-content" }}
                    >
                        <div className="col p-0">Color:</div>
                        <div className="col">
                            <input
                                type="color"
                                defaultValue={props.car.color}
                                className="form-control form-control-color"
                                title="Choose your color"
                                style={{ width: "40px" }}
                                disabled
                            />
                        </div>
                    </div>
                    {props.select ? <SelectButton /> : null}
                </div>
            </div>
        </div>
    );
};

export default CarBlock;

CarBlock.defaultProps = {
    car: {
        imageUrl: "/Background-5.jpg",
        modelName: "Model Name",
        carType: "Car Type",
        color: "green",
        registrationNumber: "WB1234",
    },
};
