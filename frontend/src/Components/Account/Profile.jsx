import { useSelector } from "react-redux";
import EditProfile from "../Form/EditProfile";
import ViewProfile from "./ViewProfile";

const Profile = (props) => {
    const user = useSelector( state => state.user);
    const profileStage = useSelector(state => state.profileStage);

    const body = {
        "view": <ViewProfile user={user} />,
        "edit": <EditProfile user={user} /> 
    }

    return (
        <>
        {body[profileStage]}
        </>
    );
};

export default Profile;
