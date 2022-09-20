import { useDispatch } from "react-redux";
import setOrderStage from "../../Actions/OrderStageAction";

const SelectedCar = (props) => {
    const dispatch = useDispatch();

    const selectCar = () =>{
        dispatch(setOrderStage("car"))
    }

    return (
        <>
            <div
                className="row mb-3 rounded-2 border border-success border-2"
                style={{ height: "max-content" }}
            >
                <div
                    className="col-3"
                    style={{
                        backgroundImage: `url(/images/thumbnail.webp)`,
                        backgroundSize: "cover",
                    }}
                ></div>
                <div className="col border-start border-dark border-1">
                    <div
                        className="row fs-5 py-2 ps-3 border-bottom border-dark border-2"
                        style={{ fontFamily: "Bree Serif" }}
                    >
                        {props.car.modelName}
                    </div>
                    <div className="row py-2 ps-3">{props.car.carType}</div>
                    <div className="row fs-4">
                        <div className="col-2 py-2 ps-3">Color:</div>
                        <div className="col pt-2">
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
                    <div className="row py-3 justify-content-end">
                        <div className="col fs-5 fw-bold pt-2">
                            {props.car.registrationNumber}
                        </div>
                        <button
                            onClick={selectCar}
                            className="btn btn-outline-success w-25 px-0 me-3"
                        >
                            Change
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default SelectedCar;
