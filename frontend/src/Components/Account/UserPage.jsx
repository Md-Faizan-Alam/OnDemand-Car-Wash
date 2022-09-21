import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet, Route, Routes, useNavigate } from "react-router-dom";
import setUser from "../../Actions/UserAction";
import UserService from "../../Services/UserService";
import Footer from "../Miscellaneous/Footer";
import Navbar from "../Miscellaneous/Navbar";
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
                <div className="container tab-component">
                    <Outlet />
                </div>
            </div>
            <Footer />
        </>
    );
};

export default UserPage;
