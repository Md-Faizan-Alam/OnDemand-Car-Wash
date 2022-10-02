import { useState } from "react";
import { useNavigate } from "react-router-dom";
import UserService from "../../Services/UserService";
import ActionRow from "../Minors/ActionRow";
import HyperLink from "../Minors/HyperLink";
import TextColumn from "../Minors/TextColumn";
import FormIndicator from "./FormIndicator";
import ShowPassword from "./ShowPassword";

const LoginForm = (props) => {
    const navigate = useNavigate();
    const [credentials, setCredentials] = useState({
        username: "",
        password: "",
    });
    const [indicator, setIndicator] = useState("blank");
    const [visible, setVisible] = useState(false);

    const handleChange = (event) => {
        setCredentials((prevCredentials) => {
            return {
                ...prevCredentials,
                [event.target.name]: event.target.value,
            };
        });
    };

    const handleLogin = async () => {
        setIndicator("spinner");
        let isValid = await UserService.validateCredentials(credentials);
        if (isValid) {
            navigate("/user/profile");
            return;
        }
        setIndicator("message");
    };

    return (
        <div className="container">
            <FormIndicator
                indicator={indicator}
                message={"Invalid username or password"}
            />
            <TextColumn
                col={"col-11 mb-3"}
                value={credentials.username}
                name={"username"}
                onChange={handleChange}
                placeholder={"Username"}
            />
            <div className="row mb-4">
                <TextColumn
                    col={"col-11 mb-3"}
                    type={visible ? "text" : "password"}
                    value={credentials.password}
                    name={"password"}
                    onChange={handleChange}
                    placeholder={"Password"}
                />
                <ShowPassword visible={visible} setVisible={setVisible} />
            </div>
            <ActionRow actionName={"Login"} handleAction={handleLogin} />
            <HyperLink to={""} text={"Forgot Password"} />
            <HyperLink
                to={"/form/register"}
                text={"New user? Create an account"}
            />
        </div>
    );
};

export default LoginForm;
