import Mapping from "../../Constants/Mapping";
import Toolbox from "../../Services/Toolbox";

const TypeColumn = (props) => {
    return (
        <div className="col-5">
            <select
                className="form-select login-input"
                aria-label="Default select example"
                value={props.value}
                name={props.name}
                onChange={props.onChange}
            >
                {Mapping.typeList.map((element) => {
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

export default TypeColumn;
