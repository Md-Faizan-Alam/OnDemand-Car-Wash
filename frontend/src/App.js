import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import Car from './Components/Account/Car';
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
import Myntra from "./Components/Static/Myntra";

function App() {
    const user = useSelector(state=>state.user)

    useEffect(()=>{
        return ()=>{
            if(localStorage.getItem('JWT') === undefined){
                localStorage.setItem('JWT','')
            }
        }
    },[]);

    return (
        <>
        <Modal />
            <Routes>
                <Route exact path="/" element={<HomePage />} />
                <Route exact path="/myntra" element={<Myntra />} />
                <Route exact path="/invoice" element={<Invoice />} />
                <Route exact path="/packs" element={<PackPage/>}/>
                <Route exact path="/addOns" element={<AddOns/>}/>

                <Route exact path="/form" element={<FormPage />}>
                    <Route index element={<LoginForm />} />
                    <Route path="register" element={<RegistrationForm />} />
                </Route>

                <Route exact path="/user" element={<UserPage/>}>
                    <Route exact path="profile" element={<Profile />} />
                    <Route exact path="cars" element={ <Car stage={"add"}/> } />
                    <Route exact path="orders" element={<Order />} />
                    <Route exact path="packs" element={<WashPack />} />
                </Route>

                <Route path="*" element={<NotFound />} />
            </Routes>
        </>
    );
}

export default App;
