import Toolbox from "../../Services/Toolbox";

const SelectColumn = (props) => {
    return (
        <div className="col">
            <select
                className="form-select login-input"
                aria-label="Default select example"
                value={props.value}
                name={props.name}
                onChange={props.onChange}
            >
                {props.optionList.map((element) => {
                    return (
                        <option key={element} value={element}>
                            {Toolbox.snakeToNormal(element)}
                        </option>
                    );
                })}
            </select>
        </div>
    );
};

export default SelectColumn;
