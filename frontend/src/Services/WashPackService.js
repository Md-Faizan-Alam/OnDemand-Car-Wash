import axios from "axios";

const WashPackService = {
    getAllWashPacks: async () => {
        return await axios
            .get("http://localhost:8100/washer/WashPack/list")
            .then((response) => response.data)
            .catch((error) => console.log(error));
    },
    getFilteredWashPacks: async (filter) => {
        return await axios
            .post("http://localhost:8100/washer/WashPack/filter", filter)
            .then((response) => response.data)
            .catch((error) => console.log(error));
    },
    getFilteredAddOns: async (filter) => {
        return await axios
            .post("http://localhost:8100/washer/AddOn/filter", filter)
            .then((response) => response.data)
            .catch((error) => console.log(error));
    },
    getWashPackById: async (id) => {
        const config = {
            headers: {
                Authorization: localStorage.getItem("JWT"),
                "Content-Type": "text/plain",
            },
        };
        const data = await axios
            .post("http://localhost:8100/washer/WashPack/getById", id, config)
            .then((response) => response.data)
            .catch((error) => console.log(error));
        return data;
    },
    getAddOnsByIds: async (idList) => {
        const config = {
            headers: {
                Authorization: localStorage.getItem("JWT"),
            },
        };
        const data = await axios
            .post("http://localhost:8100/washer/AddOn/getByIds", idList, config)
            .then((response) => response.data)
            .catch((error) => console.log(error));
        return data.list;
    },
    insertWashPack: async (washPack) => {
        const config = {
            headers: {
                Authorization: localStorage.getItem("JWT"),
            },
        };
        const message = await axios
            .post("http://localhost:8100/washer/WashPack/add", washPack, config)
            .then((response) => response.data)
        console.log(message);
        return message
    },
};

export default WashPackService;
