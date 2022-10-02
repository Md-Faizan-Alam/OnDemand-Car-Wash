import { useState } from "react";
import { useDispatch } from "react-redux";
import setProfileStage from "../../Actions/ProfileStageAction";
import UserService from "../../Services/UserService";
import ActionRow from "../Minors/ActionRow";
import TextColumn from "../Minors/TextColumn";

const EditProfile = (props) => {
    const dispatch = useDispatch();

    const [user, setUser] = useState({
        ...props.user,
        password: "",
    });

    const [confirmPassword, setConfirmPassword] = useState("");

    const handleChange = (event) => {
        setUser((prevUser) => {
            return {
                ...prevUser,
                [event.target.name]: event.target.value,
            };
        });
    };

    const saveEdit = async () => {
        if (!(user.password === confirmPassword)) return;
        await UserService.updateUser(user);
        dispatch(setProfileStage("view"));
    };

    const cancelEdit = () => {
        dispatch(setProfileStage("view"));
    };

    return (
        <>
            <div className="conatainer w-50 m-auto py-4">
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
                        value={user.email}
                        name={"email"}
                        onChange={handleChange}
                        placeholder={"Email"}
                    />
                    <div className="col">
                        <select
                            className="form-select login-input"
                            aria-label="Default select example"
                            value={user.gender}
                            name={"gender"}
                            onChange={handleChange}
                        >
                            <option value="MALE">Male</option>
                            <option value="FEMALE">Female</option>
                            <option value="OTHER">Other</option>
                        </select>
                    </div>
                </div>

                <div className="row mb-3">
                    <TextColumn
                        col={"col-8"}
                        type={"number"}
                        value={user.phoneNumber}
                        name={"phoneNumber"}
                        onChange={handleChange}
                        placeholder={"Phone Number"}
                    />
                    <div className="col">
                        <label htmlFor="dob" className="d-inline">
                            Date of Birth :
                        </label>
                        <input type="date" id="dob" className="login-input" />
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
                        onChange={(event) => {
                            setConfirmPassword(event.target.value);
                        }}
                        placeholder={"Confirm Password"}
                    />
                </div>

                <ActionRow
                    actionName={"Save"}
                    handleAction={saveEdit}
                    handleCancel={cancelEdit}
                />
            </div>
        </>
    );
};

export default EditProfile;
