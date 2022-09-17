import { useSelector } from "react-redux";
import AddCar from "../Form/AddCar";
import CarList from "./CarList";

const Car = (props) => {

    const carStage = useSelector(state=>state.carStage);
    
    const body = {
        "view": <CarList/>,
        "add": <AddCar />
    }

    return(
    <>
        {body[carStage]}
    </>
    );
}

export default Car;