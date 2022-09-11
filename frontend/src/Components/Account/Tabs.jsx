import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Tabs = (props) => {
    const [selected, setSelected] = useState(0);
    const navigate = useNavigate();

    const setTab = (tabNumber) => {
        setSelected(tabNumber);
        switch (tabNumber) {
            case 0:
                navigate("/user");
                break;
            case 1:
                navigate("/user/cars");
                break;
            case 2:
                navigate("/user/orders");
                break;
        
            default:
                navigate("/user")
                break;
        }
    };

    return (
        <div className="container">
            <button onClick={()=>{setTab(0)}} className="user-tab" style={{borderColor: `${selected===0 ? "var(--bs-success)" : "white"}` }}>
                Profile
            </button>
            <button onClick={()=>{setTab(1)}} className="user-tab" style={{borderColor: `${selected===1 ? "var(--bs-success)" : "white"}` }}>
                Cars
            </button>
            <button onClick={()=>{setTab(2)}} className="user-tab" style={{borderColor: `${selected===2 ? "var(--bs-success)" : "white"}` }}>
                Orders
            </button>
        </div>
    );
};

export default Tabs;
