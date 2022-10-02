const ColorRow = (props) => {
    return (
        <div className="row mb-4">
            <div className="col-3">
                <input
                    type="text"
                    className="login-input d-block m-auto"
                    placeholder="Color :"
                    disabled
                />
            </div>
            <div className="col">
                <input
                    type="color"
                    value={props.color}
                    name={props.name}
                    onChange={props.onChange}
                    className="form-control form-control-color"
                    id="exampleColorInput"
                />
            </div>
        </div>
    );
};

export default ColorRow;
