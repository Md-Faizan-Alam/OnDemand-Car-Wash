import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { validateUser } from "../../Actions/UserAction";
import ShowPassword from "./ShowPassword";

const LoginForm = (props) => {
    const [visible, setVisible] = useState(false);
    const [username,setUsername] = useState("");
    const [password,setPassword] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const user = useSelector(state => state.user);

    const switchVisibility = ()=>{
        setVisible(!visible);
    }

    const handleUsername = (event)=>{
        setUsername(event.target.value);
    }
    const handlePassword = (event)=>{
        setPassword(event.target.value);
    }

    const handleLogin = () =>{
        dispatch(validateUser(username,password));
    }

    return (
        <div className="container">
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
