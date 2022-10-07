import OrderBlock from "./OrderBlock";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import OrderService from "../../Services/OrderService";
import FormIndicator from "../Form/FormIndicator";
import OrderListHead from "../Static/OrderListHead";
import { useSelector } from "react-redux";
import BookNow from "../Minors/BookNow";

const OrderList = (props) => {
    const {role} = useSelector((state) => state.user);
    const refresh = useSelector((state) => state.refresh);
    const [orderList, setOrderList] = useState([]);
    const [indicator, setIndicator] = useState("null");

    let serial = 0;

    const getOrderList = async () => {
        setIndicator("spinner");
        let data = [];

        switch (role) {
            case "CUSTOMER":
                data = await OrderService.getOrdersByCustomer();
                break;
            case "WASHER":
                data = await OrderService.getAllUnacceptedOrders();
                break;
            case "ADMIN":
                data = await OrderService.getAllOrders();
                break;
            default:
                break;
        }

        if (data === []) {
            setIndicator("message");
        } else {
            setIndicator("null");
        }
        setOrderList(data.orderList);
    };

    useEffect(() => {
        getOrderList();
    }, [refresh]);

    return (
        <div className="container-fluid p-0 rounded my-5">
            <OrderListHead />
            <FormIndicator
                indicator={indicator}
                message={"No Orders to display"}
            />
            {orderList?.map((order) => {
                serial++;
                return (
                    <OrderBlock
                        key={serial}
                        serial={serial}
                        order={order}
                        role={role}
                    />
                );
            })}

            {["CUSTOMER"].includes(role) ? <BookNow /> : null}
        </div>
    );
};

export default OrderList;
