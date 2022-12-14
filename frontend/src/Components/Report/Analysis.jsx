import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { refreshPage } from "../../Actions/RefreshAction";
import ReportService from "../../Services/ReportService";
import Toolbox from "../../Services/Toolbox";
import FormIndicator from "../Form/FormIndicator";
import ReportBlock from "./ReportBlock";

const Analysis = (props) => {
    const refresh = useSelector((state) => state.refresh);
    const [reportList, setReportList] = useState([]);
    const dispatch = useDispatch();
    const [indicator, setIndicator] = useState("blank");

    const getReports = async () => {
        setIndicator("spinner");
        const data = await ReportService.getAllReports();
        console.log(data);
        data === undefined ? setIndicator("message") : setIndicator("blank");
        setReportList(data.reportList);
    };

    const handleGenerate = async () => {
        await ReportService.generateReport();
        dispatch(refreshPage());
    };

    useEffect(() => {
        getReports();
    }, [refresh]);

    return (
        <>
            <div className="container mt-3 mb-5">
                <div className="row">
                    <FormIndicator
                        indicator={indicator}
                        message={"Unable to connect"}
                    />
                </div>
                <div className="row">
                    {reportList.map((element) => {
                        element.date = Toolbox.timeToDate(
                            element.date
                        );
                        return (
                            <ReportBlock key={element.id} report={element} />
                        );
                    })}
                </div>
                <div className="row mt-3">
                    <button
                        className="btn btn-outline-success m-auto"
                        style={{ width: "20%" }}
                        onClick={handleGenerate}
                    >
                        Generate
                    </button>
                </div>
            </div>
        </>
    );
};

export default Analysis;
