import { useDispatch } from "react-redux";
import { setCarId } from "../../Actions/CurrentOrderAction";
import setOrderStage from "../../Actions/OrderStageAction";
import Toolbox from "../../Services/Toolbox";
import { setModalState } from "../../Actions/ModalStateAction";
import DeleteSymbol from "../Static/DeleteSymbol";

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
            <button
                className="btn btn-outline-danger px-2 py-0 pb-1 mb-1 d-block mt-2 delete-button"
                onClick={async (event) => {
                    dispatch(
                        setModalState({
                            header: "Confirm Deletion",
                            body: "Are you sure you want to delete this car ?",
                            task: "deleteCar",
                            payload: props.car.carId,
                        })
                    );
                }}
                data-bs-toggle="modal"
                data-bs-target="#myModal"
            >
                <DeleteSymbol />
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
