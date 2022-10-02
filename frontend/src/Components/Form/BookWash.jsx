import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { cancelOrder } from "../../Actions/CurrentOrderAction";
import setOrderStage from "../../Actions/OrderStageAction";
import Fallback from "../../Constants/Fallback";
import Secret from "../../Constants/Secrets";
import CarService from "../../Services/CarService";
import OrderService from "../../Services/OrderService";
import WashPackService from "../../Services/WashPackService";
import SelectedAddOns from "../Catalogue/SelectedAddOns";
import SelectedCar from "../Catalogue/SelectedCar";
import SelectedPack from "../Catalogue/SelectedPack";
import ActionRow from "../Minors/ActionRow";
import FormIndicator from "./FormIndicator";
import Map from "./Map";
import OrderTotal from "./OrderTotal";

const BookWash = (props) => {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user);
    const currentOrder = useSelector((state) => state.currentOrder);
    const [addOnList, setAddOnList] = useState([]);
    const [location, setlocation] = useState(Fallback.emptyLocation);
    const [pack, setPack] = useState(Fallback.fallbackPack);
    const [car, setCar] = useState(Fallback.fallbackCar);
    const [indicator, setIndicator] = useState("blank");
    const [message, setMessage] = useState("");

    const handleCancel = () => {
        dispatch(cancelOrder());
        dispatch(setOrderStage("view"));
    };

    const calculateTotal = () => {
        let sum = pack.price;
        addOnList.forEach((element) => {
            sum += element.price;
        });
        return sum;
    };

    const getAllStates = async () => {
        const fetchedPack = await WashPackService.getWashPackById(
            currentOrder.washPackId
        );
        const fetchedAddOnList = await WashPackService.getAddOnsByIds(
            currentOrder.addOnIdList
        );
        const fetchedCar = await CarService.getCarById(currentOrder.carId);
        setPack(fetchedPack);
        setAddOnList(fetchedAddOnList);
        setCar(fetchedCar);
    };

    useEffect(() => {
        getAllStates();
    }, [currentOrder]);

    const orderIsInvalid = () => {
        if (currentOrder.carId === null) {
            setMessage("Please select a car to proceed");
        } else if (currentOrder.washPackId === "0") {
            setMessage("Please select a Wash Pack to proceed");
        } else {
            return false;
        }
        setIndicator("message");
        return true;
    };

    const handleCheckout = async () => {
        setIndicator("spinner");
        if (orderIsInvalid()) return;
        await handlePay();
    };

    const handleBook = async () => {
        let event = new Date(Date.now());
        const order = {
            ...currentOrder,
            location: location,
            bookingTime: event.toISOString(),
            amount: calculateTotal(),
        };
        await OrderService.insertOrder(order);
        setInvoice();
        dispatch(cancelOrder());
        dispatch(setOrderStage("preview"));
    };

    const setInvoice = () => {
        const order = {
            date: new Date(Date.now()).toLocaleDateString("fr-CH"),
            customerName: `${user.firstName} ${user.lastName}`,
            email: user.email,
            phoneNumber: user.phoneNumber,
            list: [pack, ...addOnList],
            amount: calculateTotal(),
            car: car.modelName,
            pack: pack.title,
            addOnList: addOnList.map((element) => element.title),
        };
        localStorage.setItem("order", JSON.stringify(order));
    };

    const handlePay = async () => {
        const paymentAmount = 100 * calculateTotal();
        const paymentOrder = await OrderService.getRazorPayOrder(paymentAmount);
        const options = {
            key: Secret.getRazorPayKeyId(),
            amount: paymentAmount,
            currency: "INR",
            name: "GreenWash",
            order_id: paymentOrder.id,
            handler: handleBook,
            prefill: {
                name: `${user.firstName} ${user.lastName}`,
                email: user.email,
                contact: user.phoneNumber,
            },
        };
        const razorpay = new window.Razorpay(options);
        razorpay.on("payment.failed", (response) => {
            alert(response.error.description);
        });
        razorpay.open();
    };

    return (
        <div className="container my-5">
            <div className="container m-auto w-75">
                <SelectedCar car={car} />
                <SelectedPack pack={pack} />
                <SelectedAddOns addOnList={addOnList} />
                <Map setLocation={setlocation} />
                <OrderTotal total={calculateTotal()} />
                <FormIndicator indicator={indicator} message={message} />
                <ActionRow
                    actionName={"Checkout"}
                    handleAction={handleCheckout}
                    handleCancel={handleCancel}
                />
            </div>
        </div>
    );
};

export default BookWash;
