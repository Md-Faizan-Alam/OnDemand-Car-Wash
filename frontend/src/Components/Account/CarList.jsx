import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import setCarStage from "../../Actions/CarStageAction";
import CarService from "../../Services/CarService";
import CarBlock from "./CarBlock";

// const carList = [
//     {
//         id: "u98vm98joijm09",
//         modelName: "Audi R8",
//         carType: "Coupe",
//         color: "#FFFFFF",
//         registrationNumber: "WB3406",
//     },
//     {
//         id: "dufemud09d90ij",
//         modelName: "Maruti Suzuki Alto",
//         carType: "Hatchback",
//         color: "#892738",
//         registrationNumber: "WB9495",
//     },
//     {
//         id: "djdoidjuhvefji",
//         modelName: "Mahindra Scorpio",
//         carType: "SUV",
//         color: "#DDDDDD",
//         registrationNumber: "WB4789",
//     },
// ];

const CarList = (props) => {

    const [carList, setCarList] = useState([]);
    
    const dispatch = useDispatch();

    useEffect(() => {
        return async() => {
        const data = await CarService.getCarsByCustomer()
        .then((response)=>response.carList).catch((error)=>console.log(error));
        setCarList(data);
      }
    }, [])
    

    return (
        <div className="container p-5 tab-component d-flex justify-content-between flex-wrap">
            {carList.map((element) => {
                return (
                    <CarBlock
                        key={element.carId}
                        car={element}
                    />
                );
            })}

            <div
                className="container d-flex justify-content-center align-items-center rounded mb-4 add-slot"
                style={{ width: "35vw" , minHeight: "15vw"}}
                onClick={()=> dispatch(setCarStage("add"))}
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="100"
                    height="100"
                    fill="currentColor"
                    className="bi bi-plus-circle text-white"
                    viewBox="0 0 16 16"
                >
                    <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                    <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" />
                </svg>
            </div>
        </div>
    );
};

export default CarList;
