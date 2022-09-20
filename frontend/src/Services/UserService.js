import axios from "axios";

const UserService = {
    validateCredentials: async (username, password) => {
        const request = {
            username: username,
            password: password,
        };

        const data = await axios
            .post("http://localhost:8100/user/authenticate", request)
            .then((response) => response.data)
            .catch((error) => console.log(error));

        if (username === "username" && password === "password") return true;

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
            .get("http://localhost:8100/user/getUser", config)
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
            .put("http://localhost:8100/user/update", user, config)
            .then((response) => response.data)
            .catch((error) => console.log(`Error during updation ${error}`));
        console.log(`Update message : ${data}`);
    },





    registerUser: async (user) => {
        console.log(user);
        const data = await axios
            .post("http://localhost:8100/user/add", user)
            .then((response) => response.data)
            .catch((error) => console.log(`Error during updation ${error}`));
        console.log(`Registration message : ${data}`);
    },
};

export default UserService;
