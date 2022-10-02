import OrderBlock from "./OrderBlock";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import OrderService from "../../Services/OrderService";
import FormIndicator from "../Form/FormIndicator";
import OrderListHead from "../Static/OrderListHead";
import { useSelector } from "react-redux";

const OrderList = (props) => {
    const user = useSelector((state) => state.user);
    const refresh = useSelector((state) => state.refresh);
    const [orderList, setOrderList] = useState([]);
    const [indicator, setIndicator] = useState("blank");

    let serial = 0;

    const BookNow = ()=>{
        return(
            <div className="container-fluid py-2 mt-4 d-flex flex-row-reverse">
                <Link className="btn btn-outline-success" to={"/packs"}>
                    Book Now
                </Link>
            </div>
        )
    }

    const getOrderList = async () => {
        setIndicator("spinner");
        let data = [];

        switch (user.role) {
            case "CUSTOMER":
                data = await OrderService.getOrdersByCustomer()
                    .then((response) => response.orderList)
                    .catch((error) => console.log(error));
                break;
            case "WASHER":
                data = await OrderService.getAllUnacceptedOrders()
                    .then((response) => response.orderList)
                    .catch((error) => console.log(error));
                break;
            case "ADMIN":
                data = await OrderService.getAllOrders()
                    .then((response) => response.orderList)
                    .catch((error) => console.log(error));
                break;

            default:
                break;
        }

        if (data === []) {
            setIndicator("message");
        } else {
            setIndicator("blank");
        }
        setOrderList(data);
    };

    useEffect(() => {
        getOrderList();
    }, [refresh]);

    const Indicator = () => {
        return (
            <div className="container py-3">
                <FormIndicator
                    indicator={indicator}
                    message={"No Orders to display"}
                />
            </div>
        );
    };

    return (
        <div className="container-fluid p-0 rounded my-5">
            <OrderListHead />
            {indicator === "blank" ? "" : <Indicator />}
            {orderList?.map((order) => {
                serial++;
                return (
                    <OrderBlock key={serial} serial={serial} order={order} role={user.role} />
                );
            })}

            {["CUSTOMER"].includes(user.role) ? <BookNow /> : null}
        </div>
    );
};

export default OrderList;
