const ReportRow = (props) => {
    return (
        <>
            <div className="row">
                <div className="col-auto text-success">{props.field}: </div>
                <div className="col-auto p-0">
                    {props.data}
                </div>
            </div>
        </>
    );
};

export default ReportRow;
