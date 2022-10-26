import { Link } from "react-router-dom";

const HomeCard = (props) => {
    return (
        <div className="container-fluid home-card px-3 d-flex align-items-center">
            <div className="ms-3 ms-md-5" id="welcome-box">
                <h1 className="fs-2">
                    Welcome to your car's favorite destination
                </h1>
                <p className="card-text">
                    The best care that your car can get is right here with our
                    verified washers
                </p>
                <div className="d-flex gap-3">
                    <Link to={"/packs"} className="btn btn-outline-success">
                        Book Now
                    </Link>
                    <Link
                        to={
                            localStorage.getItem("JWT") !== ""
                                ? "/user/myOrders"
                                : "/form"
                        }
                        className="btn btn-outline-success"
                    >
                        Schedule Later
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default HomeCard;
