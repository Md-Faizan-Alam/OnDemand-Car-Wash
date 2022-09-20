import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import AddSlotButton from "../Account/AddSlotButton";
import SlotItem from "./SlotItem";

const SelectedAddOns = (props) => {
    const navigate = useNavigate();

    const goToAddOns = () => {
        navigate("/addOns");
    };

    return (
        <>
            <div className="row mb-5">
                <div
                    className="row border-bottom border-dark border-2 fs-5"
                    style={{ fontFamily: "Bree Serif" }}
                >
                    Add Ons
                </div>
                <div className="row justify-content-start border-bottom border-dark border-2 pt-4">
                    {props.addOnList.map((element) => {
                        return (<SlotItem key={element.id} pack={element} />)
                    })}
                    <AddSlotButton
                        handleClick={goToAddOns}
                        style={{
                            width: "13vw",
                            height: "10vw",
                            marginInline: "5px",
                        }}
                    />
                </div>
            </div>
        </>
    );
};

export default SelectedAddOns;
