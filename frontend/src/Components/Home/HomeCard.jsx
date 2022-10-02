import { Link } from "react-router-dom";


const HomeCard = (props) => {
    return (
        <div className="container-fluid home-card">
            <div className="card" id="welcome-box" style={{ width: "30rem" }}>
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
                    className="btn btn-outline-success me-5"
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
    );
};

export default HomeCard;
