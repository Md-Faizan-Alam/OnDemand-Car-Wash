const OrderAction = (props) => {
    return (
        <button
            className={`btn btn-${props.color} px-1 py-0 shadow-sm fs-6`}
            onClick={props.onClick}
            data-bs-toggle="modal"
            data-bs-target="#myModal"
            style={
                props.allowedStatus.includes(props.status) &&
                props.allowedRoles.includes(props.role)
                    ? null
                    : { display: "none" }
            }
        >
            {props.actionName}
        </button>
    );
};

export default OrderAction;

OrderAction.defaultProps = {
    forbiddenStatus: ["something"],
    status: "something",
    forbiddenRoles: ["something"],
    role: "something",
};
