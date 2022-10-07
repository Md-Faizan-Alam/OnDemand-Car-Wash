import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";
import setUser from "../../Actions/UserAction";
import Fallback from "../../Constants/Fallback";
import UserService from "../../Services/UserService";
import Navbar from "../Miscellaneous/Navbar";
import Footer from "../Static/Footer";
import UserHeader from "./UserHeader";

const UserPage = (props) => {
    const {
        profileStage,
        user: { firstName, lastName, role },
    } = useSelector((state) => state);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const loadUser = async () => {
        dispatch(setUser(Fallback.loadingUser));
        const data = await UserService.getUser();
        if (data) {
            dispatch(setUser(data));
        } else {
            localStorage.setItem("JWT", "");
            navigate("/form");
        }
    };

    useEffect(() => {
        loadUser();
    }, [profileStage]);

    return (
        <>
            <Navbar />
            <UserHeader user={{ firstName, lastName, role }} />
            <div className="container-fluid p-5" id="tab-background">
                <div className="container bg-white rounded-3 border border-5 border-success tab-component pb-5 px-5 position-relative">
                    <Outlet />
                </div>
            </div>
            <Footer />
        </>
    );
};

export default UserPage;
