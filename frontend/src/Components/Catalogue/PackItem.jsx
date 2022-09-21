import { Link } from "react-router-dom";
import Toolbox from "../../Services/Toolbox";

const PackItem = (props) => {

    return (
        <>
            <div
                className="container bg-light shadow rounded mx-3 my-2 border"
                style={{
                    height: "max-content",
                    width: "40vh",
                    fontFamily: "Arial",
                }}
            >
                <div
                    className="row"
                    style={{
                        height: "25vh",
                        backgroundImage: `url(/pack-images/${props.pack.title.replaceAll(
                            " ",
                            "_"
                        )}.jpg)`,
                        backgroundSize: "cover",
                    }}
                >
                    <span
                        className="badge bg-primary h-25 fs-5"
                        style={{
                            width: "max-content",
                            borderRadius: "0% 0% 15px 0%",
                        }}
                    >
                        Rs.{props.pack.price}
                    </span>
                </div>
                <div className="row fs-5 ps-2 mt-2">{props.pack.title}</div>
                <div className="row ps-2 mt-1" style={{ fontSize: "13px" }}>
                    {Toolbox.truncateText(props.pack.description)}...
                </div>
                <div className="row justify-content-end">
                    <button
                        onClick={()=>props.handleAction(props.pack.id)}
                        className="btn btn-outline-success w-50 m-3"
                        style={{ fontSize: "15px" }}
                    >
                        {props.action}
                    </button>
                </div>
            </div>
        </>
    );
};

export default PackItem;
