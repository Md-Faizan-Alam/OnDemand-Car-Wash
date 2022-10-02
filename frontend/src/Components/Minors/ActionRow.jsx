const ActionRow = (props) => {
    return (
        <div className="row mb-3">
            <div className="col d-flex justify-content-center">
                <button
                    onClick={props.handleAction}
                    className="btn btn-outline-success mx-4"
                >
                    {props.actionName}
                </button>
                <button
                    onClick={props.handleCancel}
                    className="btn btn-outline-danger"
                    style={props.handleCancel===undefined ? {display: "none"} : null}
                >
                    Cancel
                </button>
            </div>
        </div>
    );
};

export default ActionRow;
