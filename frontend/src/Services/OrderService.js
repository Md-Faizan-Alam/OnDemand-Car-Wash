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
            .post(Gateway.makePath("order","add"), order, config)
            .then((response) => response.data)
            .catch((error) => console.log(error));
        console.log("Order Insertion: ", data);
    },
    getOrdersByCustomer: async () => {
        const config = {
            headers: {
                Authorization: localStorage.getItem("JWT"),
            },
        };
        const data = await axios
            .get(Gateway.makePath("order","getByUser"), config)
            .then((response) => response.data)
            .catch((error) => console.log(error));
        console.log(data)
        return data;
    },
};

export default OrderService;
