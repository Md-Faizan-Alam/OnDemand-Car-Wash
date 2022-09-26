import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import setCarStage from "../../Actions/CarStageAction";
import Mapping from "../../Constants/Mapping";
import CarService from "../../Services/CarService";
import Toolbox from "../../Services/Toolbox";


const AddCar = (props) => {
    const customerId = useSelector((state) => state.user.userId);
    
    const [modelName, setModelName] = useState("");
    const [color, setColor] = useState("#ffffff");
    const [registrationNumber, setRegistrationNumber] = useState("");
    const [carType, setCarType] = useState("SEDAN");
    
    const dispatch = useDispatch();
    
    const handleCancel = () => {
        dispatch(setCarStage("view"));
    };
    const handleSave = async () => {
        let newCar = {
            modelName: modelName,
            customerId: customerId,
            color: color,
            registrationNumber: registrationNumber,
            carType: carType,
        };
        await CarService.insertCar(newCar);
        dispatch(setCarStage("view"));
    };

    return (
        <>
            <div className="container my-5">
                <div className="conatainer m-auto" style={{ width: "40%" }}>
                    <div className="row mb-4">
                        <div className="col">
                            <input
                                type="text"
                                value={modelName}
                                onChange={(event) =>
                                    setModelName(event.target.value)
                                }
                                className="login-input d-block m-auto"
                                placeholder="Model Name"
                                />
                        </div>
                    </div>

                    <div className="row mb-4">
                        <div className="col-3">
                            <input
                                type="text"
                                className="login-input d-block m-auto"
                                placeholder="Color :"
                                disabled
                                />
                        </div>
                        <div className="col">
                            <input
                                type="color"
                                value={color}
                                onChange={(event) =>
                                    setColor(event.target.value)
                                }
                                className="form-control form-control-color"
                                id="exampleColorInput"
                                title="Choose your color"
                                />
                        </div>
                    </div>

                    <div className="row mb-4">
                        <div className="col">
                            <input
                                type="text"
                                value={registrationNumber}
                                onChange={(event) =>
                                    setRegistrationNumber(event.target.value)
                                }
                                className="login-input d-block m-auto"
                                placeholder="Registration number"
                                />
                        </div>
                        <div className="col-5">
                            <select
                                className="form-select login-input"
                                aria-label="Default select example"
                                value={carType}
                                onChange={(event) =>
                                    setCarType(event.target.value)
                                }
                                >
                                {Mapping.typeList.map((element) => {
                                    return (
                                        <option key={element} value={element}>
                                            {Toolbox.snakeToNormal(element)}
                                        </option>
                                    );
                                })}
                                <option value="OTHER">Other</option>
                            </select>
                        </div>
                    </div>

                    <div className="row mb-3">
                        <div className="col d-flex justify-content-center">
                            <button
                                onClick={handleSave}
                                className="btn btn-outline-success me-4"
                                >
                                Save
                            </button>
                            <button
                                onClick={handleCancel}
                                className="btn btn-outline-success"
                                >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default AddCar;

