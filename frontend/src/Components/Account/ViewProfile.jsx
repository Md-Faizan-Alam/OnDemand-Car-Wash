import { useDispatch } from "react-redux";
import setProfileStage from "../../Actions/ProfileStageAction";
import RightButton from "../Minors/RightButton";
import UserInfoRow from "../Minors/UserInfoRow";

const ViewProfile = (props) => {
    const dispatch = useDispatch();

    const goToEdit = () => {
        dispatch(setProfileStage("edit"));
    };

    return (
        <>
            <div className="container-fluid p-0">
                <div className="row row-cols-1 p-5">
                    <div className="col-12">
                        <UserInfoRow
                            field={"Name"}
                            data={
                                props.user.firstName + " " + props.user.lastName
                            }
                            className={"border-top"}
                        />
                        <UserInfoRow field={"Email"} data={props.user.email} />
                        <UserInfoRow
                            field={"Phone"}
                            data={props.user.phoneNumber}
                        />
                        <UserInfoRow
                            field={"Gender"}
                            data={props.user.gender}
                        />
                    </div>
                </div>
                <RightButton name={"Edit Profile"} onClick={goToEdit} />
            </div>
        </>
    );
};

export default ViewProfile;
