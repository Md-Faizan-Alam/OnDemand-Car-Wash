import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { resetPack } from "../../Actions/CurrentPackAction";
import { setPackStage } from "../../Actions/PackStageAction";
import WashPackService from "../../Services/WashPackService";
import ActionRow from "../Minors/ActionRow";
import TextColumn from "../Minors/TextColumn";
import FormIndicator from "./FormIndicator";

const AddPack = (props) => {
    const currentPack = useSelector((state) => state.currentPack);
    const dispatch = useDispatch();

    const [pack, setPack] = useState({ ...currentPack });

    const [message, setMessage] = useState("");
    const [indicator, setIndicator] = useState("blank");

    const handleChange = (event) => {
        setPack((prevPack) => {
            return {
                ...prevPack,
                [event.target.name]: event.target.value,
            };
        });
    };

    const packIsInvalid = () => {
        if (pack.title === "") {
            setIndicator({});
            setMessage("Title cannot be empty");
        } else if (pack.description === "") {
            setMessage("Description cannot be empty");
        } else if (pack.price < 300) {
            setMessage("Price cannot be less than Rs.300");
        } else {
            return false;
        }
        setIndicator("message");
        return true;
    };

    const handleSave = async () => {
        setIndicator("spinner");
        if (packIsInvalid()) return;
        await WashPackService.saveWashPack(pack)
            .then(() => dispatch(setPackStage("view")))
            .catch(() => {
                setMessage("Unable to save WashPack");
                setIndicator("message");
            });
    };

    const handleCancel = () => {
        dispatch(resetPack());
        dispatch(setPackStage("view"));
    };

    return (
        <>
            <div className="container mt-4">
                <FormIndicator indicator={indicator} message={message} />
            </div>
            <div className="conatainer m-auto mt-0" style={{ width: "40%" }}>
                <div className="row mb-4">
                    <TextColumn
                        col={"col-8"}
                        value={pack.title}
                        name={"title"}
                        onChange={handleChange}
                        placeholder={"Title"}
                    />
                </div>
                <div className="row mb-4">
                    <div className="col">
                        <textarea
                            type={"text"}
                            value={pack.description}
                            name={"description"}
                            onChange={handleChange}
                            rows={"5"}
                            className="login-input d-block m-auto"
                            placeholder="Description"
                        />
                    </div>
                </div>

                <div className="row mb-4">
                    <TextColumn
                        col={"col-5"}
                        type={"number"}
                        value={pack.price}
                        name={"price"}
                        onChange={handleChange}
                        placeholder={"Price"}
                    />
                </div>

                <ActionRow
                    actionName={"Save"}
                    handleAction={handleSave}
                    handleCancel={handleCancel}
                />
            </div>
        </>
    );
};

export default AddPack;
