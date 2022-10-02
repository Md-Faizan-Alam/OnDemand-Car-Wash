import axios from "axios";
import Gateway from "../Constants/Gateway";

const UserService = {
    validateCredentials: async (credentials) => {
        const data = await axios
            .post(Gateway.makePath("user","authenticate"), credentials)
            .then((response) => response.data)
            .catch((error) => console.log(error));

        if (data === undefined) return false;
        if (data.jwt === "Failed") return false;

        localStorage.setItem("JWT", `Bearer ${data.jwt}`);
        return true;
    },

    getUser: async () => {
        let config = {
            headers: {
                Authorization: localStorage.getItem("JWT"),
            },
        };
        const data = await axios
            .get(Gateway.makePath("user","getUser"), config)
            .then((response) => response.data)
            .catch((error) => console.log(error));

        if (data == null) return null;
        return data;
    },
     updateUser: async (user) => {
        const config = {
            headers: {
                Authorization: localStorage.getItem("JWT"),
            },
        };
        // console.log(user)
        const data = await axios
            .put(Gateway.makePath("user","update"), user, config)
            .then((response) => response.data)
            .catch((error) => console.log(`Error during updation ${error}`));
        console.log(`Update message : ${data}`);
    },
    registerUser: async (user) => {
        console.log(user);
        const data = await axios
            .post(Gateway.makePath("user","add"), user)
            .then((response) => response.data)
            .catch((error) => console.log(`Error during updation ${error}`));
        console.log(`Registration message : ${data}`);
    },
};

export default UserService;
