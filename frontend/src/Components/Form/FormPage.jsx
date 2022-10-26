import { Link, Outlet } from "react-router-dom";

const FormPage = (props) => {
    return (
        <div className="container-fluid" id="login-background">
            <div className="bg-white py-4 px-5 w-max mx-auto rounded-5" id="new-login-block">
                <Link
                    to={"/"}
                    className={"mb-2 h3 text-decoration-none text-success font-Bree-serif"}
                >
                    GreenWash
                </Link>
                <Outlet />
            </div>
        </div>
    );
};

export default FormPage;
