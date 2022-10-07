import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Fallback from "../../Constants/Fallback";
import Mapping from "../../Constants/Mapping";
import Toolbox from "../../Services/Toolbox";
import UserService from "../../Services/UserService";
import ActionRow from "../Minors/ActionRow";
import HyperLink from "../Minors/HyperLink";
import SelectColumn from "../Minors/SelectColumn";
import TextColumn from "../Minors/TextColumn";
import FormIndicator from "./FormIndicator";

const RegistrationForm = (props) => {
    const [user, setUser] = useState(Fallback.emptyUser);
    const [indicator, setIndicator] = useState("blank");
    const [message, setMessage] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const navigate = useNavigate();

    const handleChange = (event) => {
        setUser((prevUser) => {
            return {
                ...prevUser,
                [event.target.name]: event.target.value,
            };
        });
    };

    const switchRole = () => {
        if (user.role === "CUSTOMER") {
            setUser((prevUser) => ({ ...prevUser, role: "WASHER" }));
            return;
        }
        setUser((prevUser) => ({ ...prevUser, role: "CUSTOMER" }));
    };

    const handleSubmit = async () => {
        setIndicator("spinner");
        if (
            Toolbox.registrationDataIsInvalid(user, confirmPassword, setMessage)
        ) {
            setIndicator("message");
            return;
        }
        await UserService.registerUser(user);
        let isValid = await UserService.validateCredentials({
            username: user.email,
            password: user.password,
        });
        if (isValid) {
            navigate("/user/profile");
        }
        setIndicator("blank");
    };

    return (
        <div className="conatainer">
            <FormIndicator indicator={indicator} message={message} />
            <div className="row mb-3 mt-3">
                <TextColumn
                    value={user.firstName}
                    name={"firstName"}
                    onChange={handleChange}
                    placeholder={"First Name"}
                />
                <TextColumn
                    value={user.lastName}
                    name={"lastName"}
                    onChange={handleChange}
                    placeholder={"Last Name"}
                />
            </div>

            <div className="row mb-3">
                <TextColumn
                    col={"col-8"}
                    type={"email"}
                    value={user.email}
                    name={"email"}
                    onChange={handleChange}
                    placeholder={"Email"}
                />
                <SelectColumn
                    value={user.gender}
                    name={"gender"}
                    onChange={handleChange}
                    optionList={Mapping.genderList}
                />
            </div>

            <div className="row mb-3">
                <TextColumn
                    col={"col-6"}
                    type={"number"}
                    value={user.phoneNumber}
                    name={"phoneNumber"}
                    onChange={handleChange}
                    placeholder={"Phone Number"}
                />
                <div className="col">
                    <label htmlFor="dob" className="d-inline">
                        Date of Birth :{" "}
                    </label>
                    <input
                        type="date"
                        value={user.dateOfBirth}
                        name={"dateOfBirth"}
                        onChange={handleChange}
                        id="dob"
                        className="login-input"
                    />
                </div>
            </div>

            <div className="row mb-4">
                <TextColumn
                    type={"password"}
                    value={user.password}
                    name={"password"}
                    onChange={handleChange}
                    placeholder={"Password"}
                />
                <TextColumn
                    type={"password"}
                    value={confirmPassword}
                    onChange={(event) => setConfirmPassword(event.target.value)}
                    placeholder={"Confirm Password"}
                />
            </div>

            <ActionRow actionName={"Register"} handleAction={handleSubmit} />

            <HyperLink
                text={"Already have an account? Login instead"}
                to={"/form"}
            />
            <HyperLink
                text={`Register as a ${
                    user.role === "CUSTOMER" ? "washer" : "customer"
                } instead`}
                to={""}
                onClick={switchRole}
            />
        </div>
    );
};

export default RegistrationForm;
