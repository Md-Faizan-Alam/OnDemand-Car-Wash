import { useDispatch } from "react-redux";
import setProfileStage from "../../Actions/ProfileStageAction";


const ViewProfile = (props) => {
    const dispatch = useDispatch();

    const goToEdit = () => {
        dispatch(setProfileStage("edit"));
    };

    return (
        <>
            <div className="container p-5 tab-component">
                <div className="row user-info-row border-top border-2 border-success">
                    <div className="row text-success">Name</div>
                    <div className="row fs-4 placeholder-glow">
                        {props.user.firstName}&nbsp;{props.user.lastName}
                    </div>
                </div>

                <div className="row user-info-row ">
                    <div className="row text-success">Email</div>
                    <div className="row fs-4 placeholder-glow">{props.user.email}</div>
                </div>
                <div className="row user-info-row ">
                    <div className="row text-success">Phone</div>
                    <div className="row fs-4 placeholder-glow">{props.user.phoneNumber}</div>
                </div>
                <div className="row user-info-row ">
                    <div className="row text-success">Gender</div>
                    {/* The JsUtils Service is to be used here to change it from all Caps */}
                    <div className="row fs-4 placeholder-glow">{props.user.gender}</div>
                </div>
                <div className="row user-info-row ">
                    <div className="row text-success">Birthday</div>
                    <div className="row fs-4 placeholder-glow">{props.user.dateOfBirth}</div>
                </div>

                <div className="container-fluid py-2 mt-4 d-flex flex-row-reverse">
                    <button
                        onClick={goToEdit}
                        className="btn btn-outline-success"
                    >
                        Edit Profile
                    </button>
                </div>
            </div>
        </>
    );
};

export default ViewProfile;
