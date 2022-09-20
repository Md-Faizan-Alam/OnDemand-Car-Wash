import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import CarService from "../../Services/CarService";
import CarBlock from "./CarBlock";

const CarSelection = (props) => {
    const [carList, setCarList] = useState([]);

    const dispatch = useDispatch();

    useEffect(() => {
        return async () => {
            const data = await CarService.getCarsByCustomer()
                .then((response) => response.carList)
                .catch((error) => console.log(error));
            setCarList(data);
        };
    }, []);
    return(
    <>
        <div className="container p-5 tab-component d-flex justify-content-between flex-wrap">
            {carList.map((element) => {
                return <CarBlock key={element.carId} car={element} select={true} delete={false} />;
            })}
        </div>
    </>
    );
}

export default CarSelection;