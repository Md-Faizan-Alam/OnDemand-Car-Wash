import { useDispatch } from "react-redux";
import { setPackStage } from "../../Actions/PackStageAction";

const AddPackButton = (props) => {
    const dispatch = useDispatch();
    return (
        <>
            <div
                className="container d-flex justify-content-center align-items-center  shadow rounded mx-3 my-2 add-slot"
                style={{
                    height: "50vh",
                    width: "40vh",
                }}
                onClick={()=>dispatch(setPackStage("add"))}
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="150"
                    height="150"
                    fill="currentColor"
                    className="bi bi-plus-circle text-white"
                    viewBox="0 0 16 16"
                >
                    <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                    <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" />
                </svg>
            </div>
        </>
    );
};

export default AddPackButton;
