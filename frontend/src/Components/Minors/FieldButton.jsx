import Toolbox from "../../Services/Toolbox";

const FieldButton = (props) => {
    return (
        <div>
            <div className="row w-fit m-auto px-3">
                <div className="btn-group-vertical">
                    {props.fieldList.map((fieldName) => (
                        <button
                            key={fieldName}
                            onClick={() =>
                                props.setFilter((prevFilter) => ({
                                    ...prevFilter,
                                    field: fieldName,
                                }))
                            }
                            type="button"
                            className={`btn filter-tab p-0 px-2 border border-success border-2 ${
                                props.filter.field === fieldName
                                    ? "bg-success text-light"
                                    : ""
                            }`}
                        >
                            {Toolbox.capitalizeFirst(fieldName)}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default FieldButton;
