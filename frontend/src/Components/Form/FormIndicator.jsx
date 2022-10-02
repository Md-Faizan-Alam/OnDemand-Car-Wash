const FormIndicator = (props) => {
    const blank = <div className="row mb-2 w-75">&nbsp;</div>;

    const spinner = (
        <div className="row">
            <div className="spinner-border m-auto text-success" role="status">
                <span className="visually-hidden m-auto">Loading...</span>
            </div>
        </div>
    );

    const message = (
        <div className="row mb-2 text-danger fw-semibold font-sans-serif">
            <div className="container-fluid text-center">{props.message}</div>
        </div>
    );

    const body = { blank, spinner, message };

    return <>{body[props.indicator]}</>;
};

export default FormIndicator;
