import axios from "axios";
import Fallback from "../Constants/Fallback";

const CarService = {
    insertCar: async (car) => {
        const config = {
            headers: {
                Authorization: localStorage.getItem("JWT"),
            },
        };
        console.log(car);

        const data = await axios
            .post("http://localhost:8100/user/car/add", car, config)
            .then((response) => response.data)
            .catch((error) => console.log(error));

        console.log(`Car Insertion: ${data}`);
    },

    getCarsByCustomer: async () => {
        const config = {
            headers: {
                Authorization: localStorage.getItem("JWT"),
            },
        };

        const data = await axios
            .get("http://localhost:8100/user/car/byCustomer", config)
            .then((response) => response.data)
            .catch((error) => console.log(error));

        console.log(data);

        if (data === undefined) return null;
        return data;
    },
    getCarById: async (id) => {
        if (id === null || id === undefined) return Fallback.emptyCar;

        const config = {
            headers: {
                Authorization: localStorage.getItem("JWT"),
                "Content-Type": "text/plain",
            },
        };
        const data = await axios
            .post("http://localhost:8100/user/car/getById", id, config)
            .then((response) => response.data)
            .catch((error) => {
                console.log(error);
                return Fallback.emptyCar;
            });
        return data;
    },
    deleteCarById: async (id) => {
        const config = {
            headers: {
                Authorization: localStorage.getItem("JWT"),
            },
            data: {
                stringList: [id]
            }
        };
        console.log(config);
        const message = await axios
            .delete("http://localhost:8100/user/car/delete", config)
            .then((response) => response.data)
            .catch((error) => {
                console.log(error);
            });
        console.log(`Response for Deletion request : ${message}`);
    },
};

export default CarService;