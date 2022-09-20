import { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import Car from './Components/Account/Car';
import Order from "./Components/Account/Order";
import Profile from "./Components/Account/Profile";
import UserPage from "./Components/Account/UserPage";
import AddOns from "./Components/Catalogue/AddOns";
import Packs from "./Components/Catalogue/Packs";
import FormPage from "./Components/Form/FormPage";
import LoginForm from "./Components/Form/LoginForm";
import RegistrationForm from "./Components/Form/RegistrationForm";
import HomePage from "./Components/Home/HomePage";
import NotFound from "./Components/Miscellaneous/NotFound";

function App() {

    useEffect(()=>{
        return ()=>{
            if(localStorage.getItem('JWT') === undefined){
                localStorage.setItem('JWT','')
            }
        }
    },[]);

    return (
        <>
            <Routes>
                <Route exact path="/" element={<HomePage />} />
                <Route exact path="/packs" element={<Packs/>}/>
                <Route exact path="/addOns" element={<AddOns/>}/>

                <Route exact path="/form" element={<FormPage />}>
                    <Route index element={<LoginForm />} />
                    <Route path="register" element={<RegistrationForm />} />
                </Route>

                <Route exact path="/user" element={<UserPage/>}>
                    <Route exact path="profile" element={<Profile />} />
                    <Route exact path="cars" element={ <Car stage={"add"}/> } />
                    <Route exact path="orders" element={<Order />} />
                </Route>

                <Route path="*" element={<NotFound />} />
            </Routes>
        </>
    );
}

export default App;
