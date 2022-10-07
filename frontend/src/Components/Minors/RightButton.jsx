const RightButton = (props) => {
    return (
        <div className="row py-3 justify-content-end">
            <div className="col-2">
                <button
                    className="btn btn-outline-success"
                    onClick={props.onClick}
                >
                    {props.name}
                </button>
            </div>
        </div>
    );
};

export default RightButton;
