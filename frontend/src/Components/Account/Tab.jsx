import { NavLink } from "react-router-dom";

const Tab = (props) => {
    const activeStyle = ({ isActive }) => {
        if (isActive) {
            return {
                borderColor: "var(--bs-success)",
            };
        }
    };

    return (
        <div
            style={props.visible.includes(props.role) ? { display: "initial" } : { display: "none" }}
        >
            <NavLink className="d-inline-block text-black text-decoration-none fs-5 px-3 py-2 user-tab" style={activeStyle} to={props.to}>
                {props.name}
            </NavLink>
        </div>
    );
};

export default Tab;
