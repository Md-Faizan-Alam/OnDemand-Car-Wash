import axios from "axios";

const OrderService = {
    insertOrder: async (order) => {
        const config = {
            headers: {
                Authorization: localStorage.getItem("JWT"),
            },
        };
        const data = await axios
            .post("http://localhost:8100/order/add", order, config)
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
            .get("http://localhost:8100/order/getByUser", config)
            .then((response) => response.data)
            .catch((error) => console.log(error));
        console.log(data)
        return data;
    },
};

export default OrderService;
