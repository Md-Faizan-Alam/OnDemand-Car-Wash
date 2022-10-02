import axios from "axios";
import { useDispatch } from "react-redux";
import { setPackStage } from "../Actions/PackStageAction";
import Gateway from "../Constants/Gateway";

const WashPackService = {
    getAllWashPacks: async () => {
        return await axios
            .get(Gateway.makePath("washer", "WashPack", "list"))
            .then((response) => response.data)
            .catch((error) => console.log(error));
    },
    getFilteredWashPacks: async (filter) => {
        return await axios
            .post(Gateway.makePath("washer", "WashPack", "filter"), filter)
            .then((response) => response.data)
            .catch((error) => console.log(error));
    },
    getFilteredAddOns: async (filter) => {
        return await axios
            .post(Gateway.makePath("washer", "AddOn", "filter"), filter)
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
            .post(Gateway.makePath("washer", "WashPack", "getById"), id, config)
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
            .post(
                Gateway.makePath("washer", "AddOn", "getByIds"),
                idList,
                config
            )
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
            .post(
                Gateway.makePath("washer", "WashPack", "add"),
                washPack,
                config
            )
            .then((response) => response.data);
        console.log(message);
        return message;
    },
    updateWashPack: async (washPack) => {
        const config = {
            headers: {
                Authorization: localStorage.getItem("JWT"),
            },
        };
        const message = await axios
            .put(
                Gateway.makePath("washer", "WashPack", "update"),
                washPack,
                config
            )
            .then((response) => response.data);
        console.log(message);
        return message;
    },
    getAllAddOns: async () => {
        return await axios
            .get(Gateway.makePath("washer", "AddOn", "list"))
            .then((response) => response.data)
            .catch((error) => console.log(error));
    },
    deleteWashPack: async (id) => {
        const config = {
            headers: {
                Authorization: localStorage.getItem("JWT"),
            },
            data: {
                stringList: [id],
            },
        };
        const message = await axios
            .delete(Gateway.makePath("washer", "WashPack", "delete"), config)
            .then((response) => response.data)
            .catch((error) => console.log(error));
        console.log(`Response for Deletion request : ${message}`);
    },

    saveWashPack: async (pack) => {
        if (pack.id === null) {
            return await WashPackService.insertWashPack(pack);
        } else {
            return await WashPackService.updateWashPack(pack);
        }
    },
};

export default WashPackService;
