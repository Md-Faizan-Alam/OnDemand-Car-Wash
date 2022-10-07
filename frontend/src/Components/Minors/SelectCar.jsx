const SelectCar = (props) => {
    return (
        <div className="row justify-content-end pe-5">
            <button
                className="btn btn-success w-25 text-center p-0 mb-3"
                onClick={props.onClick}
                style={props.visible ? null : {display: "none"}}
            >
                Select
            </button>
        </div>
    );
};

export default SelectCar;

SelectCar.defaultProps = {
    visible: false,
}
