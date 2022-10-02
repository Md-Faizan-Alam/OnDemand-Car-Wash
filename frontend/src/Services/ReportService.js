import axios from "axios";
import Gateway from "../Constants/Gateway";

const ReportService = {
    getAllReports: async () => {
        const config = {
            headers: {
                Authorization: localStorage.getItem("JWT"),
            },
        };
        const data = await axios
            .get(Gateway.makePath("report", "list"), config)
            .then((response) => response.data)
            .catch((error) => console.log(error));
        console.log(data);
        return data;
    },
    generateReport: async () => {
        const config = {
            headers: {
                Authorization: localStorage.getItem("JWT"),
            },
        };
        await axios
            .get(Gateway.makePath("report", "generate"), config).catch(error=>console.log(error))
        console.log("generated")
    },

    deleteReportById: async (id) => {
        const config = {
            headers: {
                Authorization: localStorage.getItem("JWT"),
            },
            data: {
                stringList: [id]
            }
        };
        const message = await axios
            .delete(Gateway.makePath("report","delete"), config)
            .then((response) => response.data)
            .catch((error) => {
                console.log(error);
            });
        console.log(`Response for Deletion request : ${message}`);
    },
}

export default ReportService;