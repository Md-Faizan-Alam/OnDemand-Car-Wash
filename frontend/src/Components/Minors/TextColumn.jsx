const TextColumn = (props) => {
    return (
        <div className={props.col}>
            <input
                type={props.type}
                value={props.value}
                name={props.name}
                onChange={props.onChange}
                className="login-input d-block m-auto"
                placeholder={props.placeholder}
                disabled={props.disabled}
            />
        </div>
    );
};

export default TextColumn;

TextColumn.defaultProps = {
    type: "text",
    col: "col",
    disabled: false,
}
