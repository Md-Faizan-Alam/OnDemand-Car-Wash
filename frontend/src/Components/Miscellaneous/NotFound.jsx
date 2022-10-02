import { Link } from "react-router-dom";

const NotFound = (props) => {

    return (
        <div className="conatiner-fluid p-5" id="not-found">
            <div className="ms-5 fs-1 fw-bold">
                There is nothing to see here
            </div>
            <div className="ms-5 fs-4" style={{ width: "35%" }}>
                You seem to have lost. Consider going back to the Homepage
            </div>
            <Link to={"/"} className="btn btn-success m-5">
                Go home
            </Link>
        </div>
    );
};

export default NotFound;
