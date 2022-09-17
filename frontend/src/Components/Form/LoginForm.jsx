import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import setSigned from "../../Actions/SignedAction";
import UserService from "../../Services/UserService";
import FormIndicator from "./FormIndicator";
import ShowPassword from "./ShowPassword";

const LoginForm = (props) => {

    const [visible, setVisible] = useState(false);
    const [indicator, setIndicator] = useState("blank");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const switchVisibility = () => {
        setVisible(!visible);
    };

    const handleUsername = (event) => {
        setUsername(event.target.value);
    };
    const handlePassword = (event) => {
        setPassword(event.target.value);
    };

    const handleLogin = async () => {
        setIndicator("spinner");
        let isValid = await UserService.validateCredentials(username, password);
        if (isValid) {
            dispatch(setSigned(true));
            navigate("/user/profile");
        } else {
            setIndicator("message");
            setUsername("");
            setPassword("");
        }
    };

    return (
        <div className="container">

            <FormIndicator indicator={indicator} message={"Invalid username or password"}/>

            <div className="row mb-3">
                <div className="col-11">
                    <input
                        onChange={handleUsername}
                        value={username}
                        type="text"
                        className="login-input d-block m-auto"
                        placeholder="Username"
                    />
                </div>
            </div>

            <div className="row mb-4">
                <div className="col">
                    <input
                        onChange={handlePassword}
                        value={password}
                        type={visible ? "text" : "password"}
                        className="login-input d-block m-auto"
                        placeholder="Password"
                    />
                </div>

                <div className="col-1">
                    <button className="showPassword" onClick={switchVisibility}>
                        <ShowPassword visible={visible} />
                    </button>
                </div>
                
            </div>

            <div className="row mb-3">
                <div className="col">
                    <button
                        onClick={handleLogin}
                        type="submit"
                        className="btn btn-outline-success d-block m-auto"
                    >
                        Login
                    </button>
                </div>
            </div>

            <div className="row">
                <div className="col text-center">
                    <Link className="hyper-link" to={""}>
                        Forgot Password
                    </Link>
                </div>
            </div>

            <div className="row">
                <div className="col text-center">
                    <Link className="hyper-link" to={"/form/register"}>
                        New user? Create an account
                    </Link>
                </div>
            </div>

        </div>
    );
};

export default LoginForm;
