import { useState } from "react";
import { useDispatch } from "react-redux";
import { setPackStage } from "../../Actions/PackStageAction";
import WashPackService from "../../Services/WashPackService";
import FormIndicator from "./FormIndicator";

const AddPack = (props) => {
    const dispatch = useDispatch();

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState(0);

    const [message, setMessage] = useState("");
    const [indicator, setIndicator] = useState("blank");

    const handleSave = async () => {
        setIndicator("spinner");
        if (title === "") {
            setMessage("Title cannot be empty");
            setIndicator("message");
            return;
        } else if (description === "") {
            setMessage("Description cannot be empty");
            setIndicator("message");
            return;
        } else if (price < 300) {
            setMessage("Price cannot be less than Rs.300");
            setIndicator("message");
            return;
        }
        await WashPackService.insertWashPack({
            title: title,
            description: description,
            price: price,
        })
            .then(() => dispatch(setPackStage("view")))
            .catch(() => {
                setMessage("Unable to add WashPack");
                setIndicator("message");
            });
    };
    const handleCancel = () => {
        dispatch(setPackStage("view"));
    };
    return (
        <>
            <div className="container mt-4">
                <FormIndicator indicator={indicator} message={message} />
            </div>
            <div className="conatainer m-auto mt-0" style={{ width: "40%" }}>
                <div className="row mb-4">
                    <div className="col-8">
                        <input
                            type="text"
                            value={title}
                            onChange={(event) => setTitle(event.target.value)}
                            className="login-input d-block m-auto"
                            placeholder="Title"
                        />
                    </div>
                </div>
                <div className="row mb-4">
                    <div className="col">
                        <textarea
                            type={"text"}
                            value={description}
                            onChange={(event) =>
                                setDescription(event.target.value)
                            }
                            rows={"5"}
                            className="login-input d-block m-auto"
                            placeholder="Description"
                        ></textarea>
                    </div>
                </div>

                <div className="row mb-4">
                    <div className="col-5">
                        <input
                            type="number"
                            value={price}
                            onChange={(event) => setPrice(event.target.value)}
                            className="login-input d-block m-auto"
                            placeholder="Price"
                        />
                    </div>
                </div>

                <div className="row mb-3">
                    <div className="col d-flex justify-content-center">
                        <button
                            onClick={handleSave}
                            className="btn btn-outline-success me-4"
                        >
                            Save
                        </button>
                        <button
                            onClick={handleCancel}
                            className="btn btn-outline-success"
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default AddPack;
