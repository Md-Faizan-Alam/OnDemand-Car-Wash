import { Outlet } from "react-router-dom";
import Footer from "../Footer";
import Navbar from "../Navbar";
import Profile from "./Profile";
import TabComponent from "./TabComponent";
import UserHeader from "./UserHeader";

const UserPage = (props) => {
    return(
    <>
        <Navbar />
        <UserHeader />
        <div className="container-fluid p-5" id="tab-component-background">
            <Outlet />
        </div>
        <Footer />
    </>
    );
}

export default UserPage;