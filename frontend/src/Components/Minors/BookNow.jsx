import { Link } from "react-router-dom";

const BookNow = (props) => {
    return (
        <div className="container-fluid py-2 mt-4 d-flex flex-row-reverse">
            <Link className="btn btn-outline-success" to={"/packs"}>
                Book Now
            </Link>
        </div>
    );
};

export default BookNow;
