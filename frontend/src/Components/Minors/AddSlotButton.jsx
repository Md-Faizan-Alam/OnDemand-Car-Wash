import AddSymbol from "../Static/AddSymbol";

const AddSlotButton = (props) => {
    return (
        <div
            className="container d-flex justify-content-center align-items-center rounded add-slot"
            style={props.style}
            onClick={props.handleClick}
            role={"button"}
        >
            <AddSymbol />
        </div>
    );
};

export default AddSlotButton;
