import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import setOrderStage from "../../Actions/OrderStageAction";
import WashPackService from "../../Services/WashPackService";
import SelectedAddOns from "../Catalogue/SelectedAddOns";
import SelectedPack from "../Catalogue/SelectedPack";
import SelectedCar from "../Catalogue/SelectedCar";
import CarService from "../../Services/CarService";
import {
    cancelOrder,
    setBookingTime,
    setLocation,
    setOrderLocation,
} from "../../Actions/CurrentOrderAction";
import Map from "./Map";
import OrderTotal from "./OrderTotal";
import FormIndicator from "./FormIndicator";
import OrderService from "../../Services/OrderService";

const BookWash = (props) => {
    const dispatch = useDispatch();
    const currentOrder = useSelector((state) => state.currentOrder);
    const [addOnList, setAddOnList] = useState([]);
    const [location, setlocation] = useState({
        lat: 0,
        lng: 0,
    });

    const [pack, setPack] = useState({
        title: "No Pack Selected",
        description: "No description available",
        price: 0,
    });

    const [car, setCar] = useState({
        modelName: "No Car Selected",
        carType: "",
        color: "#000000",
        registrationNumber: "",
    });

    const [indicator, setIndicator] = useState("blank");
    const [message, setMessage] = useState("");

    const handleCancel = () => {
        dispatch(cancelOrder());
        dispatch(setOrderStage("view"));
    };

    const getPackById = async (id) => {
        const data = await WashPackService.getWashPackById(id)
            .then((response) => response)
            .catch((error) => console.log(error));
        setPack(data);
    };

    const getAddOnsByIdList = async (idList) => {
        const data = await WashPackService.getAddOnsByIds(idList)
            .then((response) => response)
            .catch((error) => console.log(error));
        setAddOnList(data);
    };

    const getCarById = async (carId) => {
        const data = await CarService.getCarById(carId)
            .then((response) => response)
            .catch((error) => console.log(error));
        setCar(data);
    };

    const calculateTotal = () => {
        let sum = pack.price;
        addOnList.forEach((element) => {
            sum += element.price;
        });
        return sum;
    };

    const getAllStates = async () => {
        await getPackById(currentOrder.washPackId);
        await getAddOnsByIdList(currentOrder.addOnIdList);
        await getCarById(currentOrder.carId);
    };

    useEffect(() => {
        getAllStates();
    }, [currentOrder]);

    const handleBook = async () => {
        setIndicator("spinner");
        if (currentOrder.carId === null) {
            setMessage("Please select a car to proceed");
        } else if (currentOrder.washPackId === null) {
            setMessage("Please select a Wash Pack to proceed");
        } else {
            // dispatch(setBookingTime())
            // dispatch(setOrderLocation(location))
            let event = new Date(Date.now());
            const order = {
                ...currentOrder,
                location: location,
                bookingTime: event.toISOString(),
                amount: calculateTotal(),
            };
            await OrderService.insertOrder(order);
            dispatch(cancelOrder());
            dispatch(setOrderStage("view"));
        }
        setIndicator("message")
    };

    return (
        <div className="container p-5 tab-component">
            <div className="container m-auto w-75">
                <SelectedCar car={car} />
                <SelectedPack pack={pack} />
                <SelectedAddOns addOnList={addOnList} />
                <Map setLocation={setlocation} />
                <OrderTotal total={calculateTotal()} />
                <FormIndicator indicator={indicator} message={message} />
                <div className="row mb-3">
                    <div className="col d-flex justify-content-center">
                        <button
                            className="btn btn-outline-success me-4"
                            onClick={handleBook}
                        >
                            Book
                        </button>
                        <button
                            className="btn btn-outline-danger"
                            onClick={handleCancel}
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BookWash;
