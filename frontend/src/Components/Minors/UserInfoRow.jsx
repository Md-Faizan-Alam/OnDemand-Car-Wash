import Toolbox from "../../Services/Toolbox";

const UserInfoRow = (props) => {
    return (
        <div
            className={`row border-bottom border-success border-2 w-fit ${props.className}`}
        >
            <div className="row text-success h5 fw-semibold mb-0">
                {props.field}
            </div>
            <div className="row fs-3">{Toolbox.loadString(props.data)}</div>
        </div>
    );
};

export default UserInfoRow;
