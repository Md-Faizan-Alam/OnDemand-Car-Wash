const InfoRow = (props) => {
    return (
        <>
            <div className={"row user-info-row "+props.rowClass}>
                <div className="row text-success">{props.field}</div>
                <div className="row fs-4">{props.data}</div>
            </div>
        </>
    );
};

export default InfoRow;

InfoRow.defaultProps = {
    rowClass: "",
    field: "Field",
    data: "Data corresponding to that field"
}
