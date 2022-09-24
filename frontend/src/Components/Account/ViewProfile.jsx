import { useDispatch } from "react-redux";
import setProfileStage from "../../Actions/ProfileStageAction";
import Toolbox from "../../Services/Toolbox";

const ViewProfile = (props) => {
    const dispatch = useDispatch();

    const goToEdit = () => {
        dispatch(setProfileStage("edit"));
    };

    return (
        <>
            <div className="row mt-5 user-info-row border-top border-2 border-success">
                <div className="row text-success">Name</div>
                <div className="row fs-4 placeholder-glow">
                    {Toolbox.loadString(props.user.firstName)}&nbsp;
                    {Toolbox.loadString(props.user.lastName)}
                </div>
            </div>

            <div className="row user-info-row ">
                <div className="row text-success">Email</div>
                <div className="row fs-4 placeholder-glow">
                    {Toolbox.loadString(props.user.email)}
                </div>
            </div>
            <div className="row user-info-row ">
                <div className="row text-success">Phone</div>
                <div className="row fs-4 placeholder-glow">
                    {Toolbox.loadString(props.user.phoneNumber)}
                </div>
            </div>
            <div className="row user-info-row ">
                <div className="row text-success">Gender</div>
                {/* The JsUtils Service is to be used here to change it from all Caps */}
                <div className="row fs-4 placeholder-glow">
                    {Toolbox.loadString(props.user.gender)}
                </div>
            </div>
            {/* <div className="row user-info-row ">
                    <div className="row text-success">Birthday</div>
                    <div className="row fs-4 placeholder-glow">{Toolbox.loadString(props.user.dateOfBirth)}</div>
                </div> */}

            <div className="container-fluid mb-4 py-2 mt-4 d-flex flex-row-reverse">
                <button onClick={goToEdit} className="btn btn-outline-success">
                    Edit Profile
                </button>
            </div>
        </>
    );
};

export default ViewProfile;
