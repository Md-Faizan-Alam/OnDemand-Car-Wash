import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";
import setUser from "../../Actions/UserAction";
import UserService from "../../Services/UserService";
import Navbar from "../Miscellaneous/Navbar";
import Footer from "../Static/Footer";
import UserHeader from "./UserHeader";

const UserPage = (props) => {
    const user = useSelector((state) => state.user);
    const profileStage = useSelector((state) => state.profileStage);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const loadingUser = {
        firstName: "",
        lastName: "",
        email: "",
        phoneNumber: "",
        gender: "",
        dateOfBirth: "",
    };

    const loadUser = async () => {
        dispatch(setUser(loadingUser));
        let data = await UserService.getUser();
        if (data !== null && data.userId !== null) {
            dispatch(setUser(data));
        } else {
            localStorage.setItem("JWT", "");
            console.log("Go to the form");
            navigate("/form");
        }
    };

    useEffect(() => {
        loadUser();
    }, [profileStage]);

    return (
        <>
            <Navbar condition={"logout"} />
            <UserHeader user={user} />
            <div className="container-fluid p-5" id="tab-background">
                <div className="container tab-component px-5">
                    <Outlet />
                </div>
            </div>
            <Footer />
        </>
    );
};

export default UserPage;
