import { Link, Outlet } from "react-router-dom";
import LoginForm from "./LoginForm";
import RegistrationForm from "./RegistrationForm";

const FormPage = (props) => {
    return (
        <div className="container-fluid" id="login-background">
            <div className="card m-auto" id="login-block">
                <div className="card-body">
                    <Link to={"/"} className="card-title mb-2 h2 text-decoration-none text-success">GreenWash</Link>
                    <Outlet />
                </div>
            </div>
        </div>
    );
};

export default FormPage;
