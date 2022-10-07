import { useDispatch } from "react-redux";
import { removeAddOnId } from "../../Actions/CurrentOrderAction";
import Toolbox from "../../Services/Toolbox";
import DeleteButton from "../Minors/DeleteButton";

const SlotItem = (props) => {
    const dispatch = useDispatch();

    const handleDelete = () => {
        dispatch(removeAddOnId(props.pack.id));
    };

    return (
        <div
            key={props.pack.id}
            className="container rounded-2 h-100 mx-1 w-25 text-white slot-item fw-semibold mb-4 justify-items-end position-relative"
            style={{
                backgroundImage: Toolbox.titleToUrl(props.pack.title),
            }}
        >
            <DeleteButton
                onClick={handleDelete}
                className={"position-absolute top-0 end-0 m-2"}
                modal={false}
            />
            <div className="pt-2 position-absolute bottom-0 mb-2">
                {props.pack.title}
            </div>
        </div>
    );
};

export default SlotItem;
