import { Link } from "react-router-dom";
import Toolbox from "../../Services/Toolbox";

const PackItem = (props) => {
    const description =
        "This a dummy description for a wash pack that is supposed to be placed here below the title";

    return (
        <>
            <div
                className="container shadow rounded mx-3 my-2 border"
                style={{
                    height: "60vh",
                    width: "40vh",
                    fontFamily: "Arial",
                }}
            >
                <div
                    className="row"
                    style={{
                        height: "25vh",
                        backgroundImage: `url(./pack-images/${props.pack.title.replaceAll(
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
                    {Toolbox.truncateText(description)}...
                </div>
                <div className="row ps-2 mt-1" style={{ fontSize: "13px" }}>
                    {props.pack.price}
                </div>
                <div className="row justify-content-end">
                    <Link
                        to={"/"}
                        className="btn btn-outline-success w-50 m-3"
                        style={{ fontSize: "15px" }}
                    >
                        Book
                    </Link>
                </div>
            </div>
        </>
    );
};

export default PackItem;
