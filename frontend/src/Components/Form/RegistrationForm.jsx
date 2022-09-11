import { useState } from "react";
import { Link } from "react-router-dom";

const RegistrationForm = (props) => {
    const cardStyle = {};
    const [showPassword,setShowPassword] = useState(false);

    return (
        <div className="conatainer">
            <div className="row mb-3">
                <div className="col">
                    <input
                        type="text"
                        className="login-input d-block m-auto"
                        placeholder="First Name"
                    />
                </div>
                <div className="col">
                    <input
                        type="text"
                        className="login-input d-block m-auto"
                        placeholder="Last Name"
                    />
                </div>
            </div>

            <div className="row mb-3">
                <div className="col-8">
                    <input
                        type="email"
                        className="login-input d-block m-auto"
                        placeholder="Email"
                    />
                </div>
            </div>

            <div className="row mb-3">
                <div className="col-7">
                    <input
                        type="number"
                        className="login-input d-block m-auto"
                        placeholder="Phone Number"
                    />
                </div>
            </div>

            <div className="row mb-4">
                <div className="col">
                    <input
                        type={showPassword ? "text" : "password"}
                        className="login-input d-block m-auto"
                        placeholder="Password"
                    />
                </div>
                <div className="col">
                    <input
                        type="password"
                        className="login-input d-block m-auto"
                        placeholder="Confirm Password"
                    />
                </div>
            </div>

            <div className="row mb-3">
                <div className="col">
                    <button
                        type="submit"
                        className="btn btn-outline-success d-block m-auto"
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

        </div>
    );
};

export default RegistrationForm;
