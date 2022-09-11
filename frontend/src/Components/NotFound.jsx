import { useNavigate } from "react-router-dom";

const NotFound = (props) => {

    const navigate = useNavigate();

    const backStyle = {
        backgroundImage: "url(./NotFound.png)",
        backgroundSize: "cover",
        height: "100vh",
    };

    const goHome = ()=>{
        navigate("/");
    }

    return (
        <div className="conatiner-fluid p-5" style={backStyle}>
            <div className="ms-5 fs-1 fw-bold">There is nothing to see here</div>
            <div className="ms-5 fs-4" style={{width: "35%"}}>You seem to have lost. Consider going back to the Homepage</div>
            <button onClick={goHome} className="btn btn-success m-5">Go home</button>
        </div>
    );
};

export default NotFound;
