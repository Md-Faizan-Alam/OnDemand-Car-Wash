import { Link } from "react-router-dom";


const HomeCard = (props) => {
    return (
        <div className="container-fluid home-card">
            <div className="w-75">
                <div className="card ms-5 bg-transparent border-0 w-50" id="welcome-box">
                <div className="card-body">
                    <h1 className="card-title">
                        Welcome to your car's favorite destination
                    </h1>
                    <p className="card-text">
                        The best care that your car can get is right here with our
                        verified washers
                    </p>
                    <Link
                        to={"/packs"}
                        className="btn btn-outline-success me-4"
                    >
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
        </div>
    );
};

export default HomeCard;
