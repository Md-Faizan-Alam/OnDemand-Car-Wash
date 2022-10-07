import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import setOrderStage from "../../Actions/OrderStageAction";
import CarService from "../../Services/CarService";
import CarBlock from "./CarBlock";

const CarSelection = (props) => {
    const [carList, setCarList] = useState([]);
    const dispatch = useDispatch();

    const goBack = () => {
        dispatch(setOrderStage("book"));
    };

    const getCars = async () => {
        const data = await CarService.getCarsByCustomer();
        setCarList(data.carList);
    };

    useEffect(() => {
        getCars();
    }, []);

    return (
        <div className="container my-5 d-flex justify-content-between flex-wrap">
            {carList.map((element) => {
                return (
                    <CarBlock
                        key={element.carId}
                        car={element}
                        select={true}
                        delete={false}
                    />
                );
            })}
            <button className="btn btn-outline-success" onClick={goBack}>
                Back
            </button>
        </div>
    );
};

export default CarSelection;
