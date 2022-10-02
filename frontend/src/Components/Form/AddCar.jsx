import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import setCarStage from "../../Actions/CarStageAction";
import Fallback from "../../Constants/Fallback";
import CarService from "../../Services/CarService";
import ActionRow from "../Minors/ActionRow";
import ColorRow from "../Minors/ColorRow";
import TextColumn from "../Minors/TextColumn";
import TypeColumn from "../Minors/TypeColumn";

const AddCar = (props) => {
    const customerId = useSelector((state) => state.user.userId);
    const dispatch = useDispatch();

    const [car, setCar] = useState({
        ...Fallback.emptyCar,
        customerId,
    });

    const handleChange = (event) => {
        setCar((prevCar) => {
            return {
                ...prevCar,
                [event.target.name]: event.target.value,
            };
        });
    };

    const handleCancel = () => {
        dispatch(setCarStage("view"));
    };

    const handleSave = async () => {
        await CarService.insertCar(car);
        dispatch(setCarStage("view"));
    };

    return (
        <>
            <div className="container my-5 m-auto w-50 px-5">
                <div className="row mb-4">
                    <TextColumn
                        value={car.modelName}
                        name={"modelName"}
                        onChange={handleChange}
                        placeholder={"Model Name"}
                    />
                </div>
                <ColorRow
                    color={car.color}
                    name={"color"}
                    onChange={handleChange}
                />
                <div className="row mb-4">
                    <TextColumn
                        value={car.registrationNumber}
                        name={"registrationNumber"}
                        onChange={handleChange}
                        placeholder={"Registration Number"}
                    />
                    <TypeColumn
                        value={car.carType}
                        name={"carType"}
                        onChange={handleChange}
                    />
                </div>
                <ActionRow
                    actionName={"Save"}
                    handleAction={handleSave}
                    handleCancel={handleCancel}
                />
            </div>
        </>
    );
};

export default AddCar;
