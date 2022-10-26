import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import OrderService from "../../Services/OrderService";
import FormIndicator from "../Form/FormIndicator";
import BookNow from "../Minors/BookNow";
import NoOrders from "../Static/NoOrders";
import OrderListHead from "../Static/OrderListHead";
import OrderBlock from "./OrderBlock";

const OrderList = (props) => {
    const { role } = useSelector((state) => state.user);
    const refresh = useSelector((state) => state.refresh);
    const [orderList, setOrderList] = useState([]);
    const [indicator, setIndicator] = useState("null");

    const getOrdersByRole = async () => {
        switch (role) {
            case "CUSTOMER":
                return await OrderService.getOrdersByCustomer();
            case "WASHER":
                return await OrderService.getAllUnacceptedOrders();
            case "ADMIN":
                return await OrderService.getAllOrders();
            default:
                return null;
        }
    };

    const getOrderList = async () => {
        setIndicator("spinner");
        const data = await getOrdersByRole();
        setIndicator("null")
        setOrderList(data);
    };

    useEffect(() => {
        getOrderList();
    }, [refresh]);

    return (
        <div className="container-fluid p-0 rounded my-5">
            <OrderListHead />
            <FormIndicator indicator={indicator}/>
            {orderList.length === 0 ? (
                <>
                    <NoOrders />
                </>
            ) : (
                orderList?.map((order, key) => {
                    return (
                        <OrderBlock
                            key={key}
                            serial={key + 1}
                            order={order}
                            role={role}
                        />
                    );
                })
            )}

            {["CUSTOMER"].includes(role) ? <BookNow /> : null}
        </div>
    );
};

export default OrderList;
