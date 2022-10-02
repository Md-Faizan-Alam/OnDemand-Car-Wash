import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Route, Routes, useLocation } from "react-router-dom";
import "./App.css";
import Car from "./Components/Account/Car";
import Order from "./Components/Account/Order";
import Profile from "./Components/Account/Profile";
import UserPage from "./Components/Account/UserPage";
import WashPack from "./Components/Account/WashPack";
import AddOns from "./Components/Catalogue/AddOns";
import PackPage from "./Components/Catalogue/PackPage";
import FormPage from "./Components/Form/FormPage";
import LoginForm from "./Components/Form/LoginForm";
import RegistrationForm from "./Components/Form/RegistrationForm";
import HomePage from "./Components/Home/HomePage";
import Invoice from "./Components/Miscellaneous/Invoice";
import Modal from "./Components/Miscellaneous/Modal";
import NotFound from "./Components/Miscellaneous/NotFound";
import Analysis from "./Components/Report/Analysis";

function App() {
    const { profileStage, carStage, orderStage, packStage } = useSelector(
        (state) => state
    );
    const { pathname } = useLocation();

    useEffect(() => {
        if (localStorage.getItem("JWT") === undefined) {
            localStorage.setItem("JWT", "");
        }
    }, []);

    useEffect(() => {
        if (pathname.startsWith("/user") && pathname !== "/user/profile") {
            window.scrollTo(0, 220);
        } else {
            window.scrollTo(0, 0);
        }
    }, [pathname, profileStage, carStage, orderStage, packStage]);

    return (
        <>
            <Modal />
            <Routes>
                <Route exact path="/" element={<HomePage />} />
                <Route exact path="/invoice" element={<Invoice />} />
                <Route exact path="/packs" element={<PackPage />} />
                <Route exact path="/addOns" element={<AddOns />} />

                <Route exact path="/form" element={<FormPage />}>
                    <Route index element={<LoginForm />} />
                    <Route path="register" element={<RegistrationForm />} />
                </Route>

                <Route exact path="/user" element={<UserPage />}>
                    <Route exact path="profile" element={<Profile />} />
                    <Route exact path="cars" element={<Car />} />
                    <Route exact path="myOrders" element={<Order />} />
                    <Route exact path="allOrders" element={<Order />} />
                    <Route exact path="packs" element={<WashPack />} />
                    <Route exact path="report" element={<Analysis />} />
                </Route>

                <Route path="*" element={<NotFound />} />
            </Routes>
        </>
    );
}

export default App;
