import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import setProfileStage from "../../Actions/ProfileStageAction";
import UserService from "../../Services/UserService";

const EditProfile = (props) => {

    const [firstName, setFirstName] = useState(props.user.firstName);
    const [lastName, setLastName] = useState(props.user.lastName);
    const [email, setEmail] = useState(props.user.email);
    const [gender, setGender] = useState(props.user.gender);
    const [phoneNumber, setPhoneNumber] = useState(props.user.phoneNumber);
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleFirstName = (event)=>{
        setFirstName(event.target.value);
    }
    const handleLastName = (event)=>{
        setLastName(event.target.value);
    }
    const handleEmail = (event)=>{
        setEmail(event.target.value);
    }
    const handlePhoneNumber = (event)=>{
        setPhoneNumber(event.target.value);
    }
    const handlePassword = (event)=>{
        setPassword(event.target.value);
    }
    const handleConfirmPassword = (event)=>{
        setConfirmPassword(event.target.value);
    }
    const handleGender = (event)=>{
        setGender(event.target.value);
    }

    const saveEdit = async ()=>{

        let newUser = Object.assign({},props.user);
        newUser.firstName = firstName ;
        newUser.lastName = lastName ;
        newUser.email = email ;
        newUser.gender = gender ;
        newUser.phoneNumber = phoneNumber ;

        await UserService.updateUser(newUser);
        navigate("/user/profile");
        dispatch(setProfileStage("view"));
    }

    const cancelEdit = ()=>{
        dispatch(setProfileStage("view"));
    }

    return (
        <>
        <div className="container p-5 tab-component">
            <div className="conatainer w-50 m-auto">
                <div className="row mb-3 mt-3">
                    <div className="col">
                        <input
                            onChange={handleFirstName}
                            type="text"
                            value={firstName}
                            className="login-input d-block m-auto"
                            placeholder="First Name"
                        />
                    </div>
                    <div className="col">
                        <input
                            onChange={handleLastName}
                            type="text"
                            value={lastName}
                            className="login-input d-block m-auto"
                            placeholder="Last Name"
                        />
                    </div>
                </div>

                <div className="row mb-3">
                    <div className="col-8">
                        <input
                            onChange={handleEmail}
                            type="email"
                            value={email}
                            className="login-input d-block m-auto"
                            placeholder="Email"
                        />
                    </div>
                    <div className="col">
                        <select
                            className="form-select login-input"
                            aria-label="Default select example"
                            value={gender}
                            onChange={handleGender}
                        >
                            <option value="MALE">Male</option>
                            <option value="FEMALE">Female</option>
                            <option value="OTHER">Other</option>
                        </select>
                    </div>
                </div>

                <div className="row mb-3">
                    <div className="col-6">
                        <input
                            onChange={handlePhoneNumber}
                            type="number"
                            value={phoneNumber}
                            className="login-input d-block m-auto"
                            placeholder="Phone Number"
                        />
                    </div>
                    <div className="col">
                        <label htmlFor="dob" className="d-inline">
                            Date of Birth :
                        </label>
                        <input type="date" id="dob" className="login-input" />
                    </div>
                </div>

                <div className="row mb-4">
                    <div className="col">
                        <input
                            onChange={handlePassword}
                            type="password"
                            value={password}
                            className="login-input d-block m-auto"
                            placeholder="Password"
                        />
                    </div>
                    <div className="col">
                        <input
                            onChange={handleConfirmPassword}
                            type="password"
                            value={confirmPassword}
                            className="login-input d-block m-auto"
                            placeholder="Confirm Password"
                        />
                    </div>
                </div>

                <div className="row mb-3">
                    <div className="col d-flex justify-content-center">
                        <button
                            onClick={saveEdit}
                            className="btn btn-outline-success me-4"
                        >
                            Save
                        </button>
                        <button
                            onClick={cancelEdit}
                            className="btn btn-outline-success"
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            </div>
        </div>
        </>
    );
};

export default EditProfile;
