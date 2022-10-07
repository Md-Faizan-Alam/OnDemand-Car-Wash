import DeleteSymbol from "../Static/DeleteSymbol";

const DeleteButton = (props) => {
    return (
        <button
            className={`btn btn-outline-danger px-2 py-0 pb-1 m-1 delete-button ${props.className}`}
            onClick={props.onClick}
            data-bs-toggle={props.modal ? "modal" : null}
            data-bs-target={props.modal ? "#myModal" : null}
            style={{
                width: "min-content",
                height: "min-content",
                display: props.visible ? "initial" : "none",
            }}
        >
            <DeleteSymbol />
        </button>
    );
};

export default DeleteButton;

DeleteButton.defaultProps = {
    visible: true,
    modal: true,
};
