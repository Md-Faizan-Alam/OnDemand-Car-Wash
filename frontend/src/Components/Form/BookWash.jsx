import { useDispatch } from "react-redux";
import setOrderStage from "../../Actions/OrderStageAction";

const BookWash = (props) => {

    const dispatch = useDispatch();

    return(
    <>
        <div className="container p-5 tab-component">
                <div className="conatainer m-auto" style={{ width: "40%" }}>
                    <div className="row mb-4">
                        <div className="col">
                            <input
                                type="text"
                                
                                className="login-input d-block m-auto"
                                placeholder="Model Name"
                            />
                        </div>
                    </div>

                    <div className="row mb-4">
                        <div className="col-3">
                            <input
                                type="text"
                                
                                className="login-input d-block m-auto"
                                placeholder="Color :"
                                disabled
                            />
                        </div>
                        <div className="col">
                            <input
                                type="color"
                                
                                className="form-control form-control-color"
                                id="exampleColorInput"
                                title="Choose your color"
                            />
                        </div>
                    </div>

                    <div className="row mb-4">
                        <div className="col">
                            <input
                                type="text"
                                
                                className="login-input d-block m-auto"
                                placeholder="Registration number"
                            />
                        </div>
                        <div className="col">
                            <input
                                type="text"
                                
                                className="login-input d-block m-auto"
                                placeholder="Type"
                            />
                        </div>
                    </div>

                    <div className="row mb-3">
                        <div className="col d-flex justify-content-center">
                            <button
                                className="btn btn-outline-success me-4"
                                onClick={()=>dispatch(setOrderStage("view"))}
                                >
                                Save
                            </button>
                            <button
                                className="btn btn-outline-success"
                                onClick={()=>dispatch(setOrderStage("view"))}
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            </div>
    </>
    );
}

export default BookWash;