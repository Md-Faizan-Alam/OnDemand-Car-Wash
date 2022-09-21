import OrderBlock from "./OrderBlock";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import OrderService from "../../Services/OrderService";
import OrderListHead from "../Static/OrderListHead";
import FormIndicator from "../Form/FormIndicator";

const OrderList = (props) => {
    const [orderList, setOrderList] = useState([]);
    const [indicator, setIndicator] = useState("blank");

    let serial = 0;

    const getOrderList = async () => {
        setIndicator("spinner");
        const data = await OrderService.getOrdersByCustomer().then(
            (response) => response.orderList
        );
        if(data === []){
            setIndicator("message")
        }else{
            setIndicator("blank")
        }
        setOrderList(data);
    };

    useEffect(() => {
        getOrderList();
        console.log(orderList);
    }, []);

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
        <div className="container p-5 tab-component">
            <div className="container-fluid p-0 rounded">
                <OrderListHead />
                {indicator === "blank" ? "" : <Indicator />}
                {orderList.map((order) => {
                    serial++;
                    return (
                        <OrderBlock
                            key={serial}
                            serial={serial}
                            order={order}
                        />
                    );
                })}

                <div className="container-fluid py-2 mt-4 d-flex flex-row-reverse">
                    <Link className="btn btn-outline-success" to={"/packs"}>
                        Book Now
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default OrderList;
