import { NavLink } from "react-router-dom";

const Tab = (props) => {

    const activeStyle = ({ isActive }) => {
        if (isActive) {
            return {
                borderColor: "var(--bs-success)",
            };
        }
    };

    const Body = ()=>{
        return(
            <NavLink
            className="user-tab"
            style={activeStyle}
            to={props.to}
        >
            {props.name}
        </NavLink>
        )
    }

    return (
        <>
        {props.visible ? <Body /> : null}
        </>
    );
};

export default Tab;