import { useDispatch } from "react-redux";
import { setPackStage } from "../../Actions/PackStageAction";
import AddSymbol from "../Static/AddSymbol";

const AddPackButton = (props) => {
    const dispatch = useDispatch();
    return (
        <>
            <div
                className="container d-flex justify-content-center align-items-center shadow rounded mx-3 my-2 add-slot"
                style={{
                    height: "50vh",
                    width: "40vh",
                }}
                onClick={()=>dispatch(setPackStage("add"))}
            >
                <AddSymbol />
            </div>
        </>
    );
};

export default AddPackButton;
