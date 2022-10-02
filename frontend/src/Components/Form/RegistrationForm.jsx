import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import UserService from "../../Services/UserService";
import FormIndicator from "./FormIndicator";

const RegistrationForm = (props) => {
    const [role, setRole] = useState("CUSTOMER");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [gender, setGender] = useState("");
    const [dateOfBirth, setDateOfBirth] = useState("2020-09-20");

    const [indicator, setIndicator] = useState("blank");
    const [message, setMessage] = useState("");

    const navigate = useNavigate();

    const inputIsInvalid = () => {
        let newMessage = "";
        if (firstName === "") {
            newMessage = "First name is mandatory";
        } else if (lastName === "") {
            newMessage = "Last name is mandatory";
        } else if (email === "") {
            newMessage = "Email is mandatory";
        } else if (phoneNumber === "") {
            newMessage = "Phone Number is mandatory";
        } else if (phoneNumber.length !== 10) {
            newMessage = "Phone Number must have 10 digits";
        } else if (password === "") {
            newMessage = "Password is mandatory";
        } else if (password !== confirmPassword) {
            newMessage = "Passwords do not match";
        } else {
            return false;
        }
        setMessage(newMessage);
        return true;
    };

    const switchRole = () => {
        if (role === "CUSTOMER") {
            setRole("WASHER");
        } else {
            setRole("CUSTOMER");
        }
    };

    const handleSubmit = async () => {
        setIndicator("spinner");
        if (inputIsInvalid()) {
            setIndicator("message");
            return;
        }
        // setIndicator("blank")
        const newUser = {
            firstName,
            lastName,
            email,
            phoneNumber,
            gender,
            password,
            role,
            carIds: [],
        };
        await UserService.registerUser(newUser);
        let isValid = await UserService.validateCredentials(email, password)
            .then((response) => response)
            .catch((error) => console.log(error));

        if (isValid) {
            navigate("/user/profile");
        }

        setIndicator("blank");
    };

    return (
        <div className="conatainer">
            <FormIndicator indicator={indicator} message={message} />
            <div className="row mb-3 mt-3">
                <div className="col">
                    <input
                        type="text"
                        value={firstName}
                        onChange={(event) => setFirstName(event.target.value)}
                        className="login-input d-block m-auto"
                        placeholder="First Name"
                        required={true}
                    />
                </div>
                <div className="col">
                    <input
                        type="text"
                        value={lastName}
                        onChange={(event) => setLastName(event.target.value)}
                        className="login-input d-block m-auto"
                        placeholder="Last Name"
                        required={true}
                    />
                </div>
            </div>

            <div className="row mb-3">
                <div className="col-8">
                    <input
                        type="email"
                        value={email}
                        onChange={(event) => setEmail(event.target.value)}
                        className="login-input d-block m-auto"
                        placeholder="Email"
                        required={true}
                    />
                </div>
                <div className="col">
                    <select
                        className="form-select login-input"
                        aria-label="Default select example"
                        value={gender}
                        onChange={(event) => setGender(event.target.value)}
                    >
                        <option value={null}>Gender</option>
                        <option value="MALE">Male</option>
                        <option value="FEMALE">Female</option>
                        <option value="OTHER">Other</option>
                    </select>
                </div>
            </div>

            <div className="row mb-3">
                <div className="col-6">
                    <input
                        type="number"
                        value={phoneNumber}
                        onChange={(event) => setPhoneNumber(event.target.value)}
                        className="login-input d-block m-auto"
                        placeholder="Phone Number"
                        required={true}
                    />
                </div>
                <div className="col">
                    <label htmlFor="dob" className="d-inline">
                        Date of Birth :{" "}
                    </label>
                    <input
                        type="date"
                        value={dateOfBirth}
                        onChange={(event) => setDateOfBirth(event.target.value)}
                        id="dob"
                        className="login-input"
                    />
                </div>
            </div>

            <div className="row mb-4">
                <div className="col">
                    <input
                        type="password"
                        value={password}
                        onChange={(event) => setPassword(event.target.value)}
                        className="login-input d-block m-auto"
                        placeholder="Password"
                        required={true}
                    />
                </div>
                <div className="col">
                    <input
                        type="password"
                        value={confirmPassword}
                        onChange={(event) =>
                            setConfirmPassword(event.target.value)
                        }
                        className="login-input d-block m-auto"
                        placeholder="Confirm Password"
                        required={true}
                    />
                </div>
            </div>

            <div className="row mb-3">
                <div className="col">
                    <button
                        type="submit"
                        className="btn btn-outline-success d-block m-auto"
                        onClick={handleSubmit}
                    >
                        Register
                    </button>
                </div>
            </div>

            <div className="row">
                <div className="col text-center">
                    <Link className="hyper-link" to="/form">
                        Already have an account? Login instead
                    </Link>
                </div>
            </div>
            <div className="row">
                <div className="col text-center">
                    <a className="hyper-link" onClick={switchRole}>
                        {`Register as a ${
                            role === "CUSTOMER" ? "washer" : "customer"
                        } instead`}
                    </a>
                </div>
            </div>
        </div>
    );
};

export default RegistrationForm;
