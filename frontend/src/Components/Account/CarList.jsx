import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import setCarStage from "../../Actions/CarStageAction";
import CarService from "../../Services/CarService";
import AddCarButton from "./AddCarButton";
import AddSlotButton from "./AddSlotButton";
import CarBlock from "./CarBlock";

const CarList = (props) => {
    const [carList, setCarList] = useState([]);
    const refresh = useSelector((state) => state.refresh);

    const dispatch = useDispatch();

    const addCar = () => {
        dispatch(setCarStage("add"));
    };

    const getCarList = async () => {
        const data = await CarService.getCarsByCustomer()
            .then((response) => response.carList)
            .catch((error) => console.log(error));
        setCarList(data);
    };

    useEffect(() => {
        getCarList();
    }, [refresh]);

    return (
        <div className="container mt-5 d-flex justify-content-start flex-wrap">
            {carList.map((element) => {
                return (
                    <CarBlock
                        key={element.carId}
                        car={element}
                        select={false}
                        delete={true}
                    />
                );
            })}
            <AddSlotButton
                handleClick={addCar}
                style={{ width: "35vw", height: "15vw" }}
            />
        </div>
    );
};

export default CarList;
