import { Outlet } from "react-router-dom";
import CarList from "./CarList";
import OrderList from "./OrderList";
import Profile from "./Profile";

const TabComponent = (props) => {
    return(
    <>
        <div className="container-fluid p-5" id="tab-component-background">
            <Outlet />
        </div>
    </>
    );
}

export default TabComponent;