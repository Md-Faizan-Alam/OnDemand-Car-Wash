import OrderBlock from "./OrderBlock";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import OrderService from "../../Services/OrderService";

const OrderList = (props) => {
    
    const [orderList, setOrderList] = useState([]);

    let serial = 0;

    const getOrderList = async ()=>{
        const data = await OrderService.getOrdersByCustomer();
        setOrderList(data.orderList)
    }

    useEffect(()=>{
        getOrderList();
        console.log(orderList)
    },[]);

    return (
        <div className="container p-5 tab-component">
            <div className="container-fluid p-0 rounded">
                <div
                    className="container-fluid bg-gradient rounded py-3 mb-3"
                    style={{
                        backgroundColor: "rgba(25,135,84,0.6)",
                        fontWeight: 600,
                    }}
                >
                    <div className="row text-center">
                        <div className="col-1">#</div>
                        <div className="col">Date</div>
                        <div className="col">Wash Pack</div>
                        <div className="col">Car</div>
                        <div className="col">Amount</div>
                        <div className="col-2">Status</div>
                    </div>
                </div>

                {orderList.map((order) => {
                    serial++;
                    return <OrderBlock key={serial} serial={serial} order={order} />;
                })}

                <div className="container-fluid py-2 mt-4 d-flex flex-row-reverse">
                    <Link className="btn btn-outline-success" to={"/packs"}>Book Now</Link>
                </div>
                
            </div>
        </div>
    );
};

export default OrderList;
