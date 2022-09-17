import { NavLink } from "react-router-dom";

const Tabs = (props) => {

    const activeStyle = ({isActive}) =>{
        if(isActive){
            return({
                borderColor: "var(--bs-success)"
            });
        }
    }

    return(
    <>
        <div className="container">
            <NavLink className="user-tab" style={activeStyle} to={"/user/profile"} >Profile</NavLink>
            <NavLink className="user-tab" style={activeStyle} to={"/user/cars"} >Cars</NavLink>
            <NavLink className="user-tab" style={activeStyle} to={"/user/orders"} >Orders</NavLink>
        </div>
    </>
    );
}

export default Tabs;