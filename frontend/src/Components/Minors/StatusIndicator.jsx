import Mapping from "../../Constants/Mapping";

const StatusIndicator = (props) => {
    return (
        <div
            className={"py-1 rounded dropdown-toggle"}
            role={"button"}
            data-bs-toggle="dropdown"
            style={{
                backgroundColor: Mapping.statusColor[props.status],
            }}
        >
            {props.status}
        </div>
    );
};

export default StatusIndicator;
