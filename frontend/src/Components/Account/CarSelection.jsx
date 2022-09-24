import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import CarService from "../../Services/CarService";
import CarBlock from "./CarBlock";

const CarSelection = (props) => {
    const [carList, setCarList] = useState([]);

    const dispatch = useDispatch();

    const getCars = async () => {
        const data = await CarService.getCarsByCustomer()
            .then((response) => response.carList)
            .catch((error) => console.log(error));
        console.log(data);
        setCarList(data);
    };

    useEffect(() => {
        getCars();
    }, []);
    return (
        <>
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
            </div>
        </>
    );
};

export default CarSelection;
