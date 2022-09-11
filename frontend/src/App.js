import "./App.css";
import UserPage from "./Components/Account/UserPage";
import HomePage from "./Components/Home/HomePage";
import FormPage from "./Components/Form/FormPage";
import { Route, Routes } from "react-router-dom";
import LoginForm from "./Components/Form/LoginForm";
import RegistrationForm from "./Components/Form/RegistrationForm";
import NotFound from "./Components/NotFound";
import Profile from "./Components/Account/Profile";
import OrderList from "./Components/Account/OrderList";
import CarList from "./Components/Account/CarList";

function App() {
    return (
        <>
        <Routes>
            <Route exact path="/" element={<HomePage/>}/>
            <Route exact path="/form" element={<FormPage/>}>
                <Route index element={<LoginForm/>} />
                <Route path="register" element={<RegistrationForm/>} />
            </Route>
            <Route exact path="/user" element={<UserPage/>}>
                <Route index element={ <Profile/> } />
                <Route path="orders" element={ <OrderList/> } />
                <Route path="cars" element={ <CarList/> } />
            </Route>
            <Route path="*" element={<NotFound />}/>
        </Routes>
        </>
    );
}

export default App;
