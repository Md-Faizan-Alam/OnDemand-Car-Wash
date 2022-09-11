import { Outlet } from "react-router-dom";
import LoginForm from "./LoginForm";
import RegistrationForm from "./RegistrationForm";

const FormPage = (props) => {
    return (
        <div className="container-fluid" id="login-background">
            <div className="card m-auto" id="login-block">
                <div className="card-body">
                    <h3 className="card-title mb-4">GreenWash</h3>
                    <Outlet />
                </div>
            </div>
        </div>
    );
};

export default FormPage;
