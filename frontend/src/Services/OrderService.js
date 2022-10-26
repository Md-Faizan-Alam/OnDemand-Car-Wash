import axios from "axios";
import Gateway from "../Constants/Gateway";

const OrderService = {
    insertOrder: async (order) => {
        const config = {
            headers: {
                Authorization: localStorage.getItem("JWT"),
            },
        };
        const data = await axios
            .post(Gateway.makePath("order", "add"), order, config)
            .then((response) => response.data)
            .catch((error) => console.log(error));
        console.log("Order Insertion: ", data);
    },
    getAllOrders: async () => {
        const config = {
            headers: {
                Authorization: localStorage.getItem("JWT"),
            },
        };
        const data = await axios
            .get(Gateway.makePath("order", "list"), config)
            .then((response) => response.data)
            .catch((error) => console.log(error));
        console.log(data);
        return data.orderList;
    },
    getAllUnacceptedOrders: async () => {
        const config = {
            headers: {
                Authorization: localStorage.getItem("JWT"),
            },
        };
        const data = await axios
            .get(Gateway.makePath("order", "getUnaccepted"), config)
            .then((response) => response.data)
            .catch((error) => console.log(error));
        console.log(data);
        return data.orderList;
    },
    getOrdersByCustomer: async () => {
        const config = {
            headers: {
                Authorization: localStorage.getItem("JWT"),
            },
        };
        const data = await axios
            .get(Gateway.makePath("order", "getByUser"), config)
            .then((response) => response.data)
            .catch((error) => console.log(error));
        console.log(data);
        return data.orderList;
    },
    updateOrder: async (updatedOrder) => {
        const config = {
            headers: {
                Authorization: localStorage.getItem("JWT"),
            },
        };
        const data = await axios
            .put(Gateway.makePath("order", "update"), updatedOrder, config)
            .then((response) => response.data)
            .catch((error) => console.log(error));
        console.log(data);
    },
    getRazorPayOrder: async (amount) => {
        const config = {
            headers: {
                Authorization: localStorage.getItem("JWT"),
                Accept: "application/json",
            },
        };
        const request = {
            amount: parseInt(amount),
            currency: 'INR'
        }
        const data = await axios
            .post(Gateway.makePath("order","getPayOrder"), request, config)
            .then((response) => response.data)
            .catch((error) => console.log(error));
        console.log(data)
        return data;
    },
};

export default OrderService;
