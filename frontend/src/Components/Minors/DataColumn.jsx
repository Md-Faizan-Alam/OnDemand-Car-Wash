import Toolbox from "../../Services/Toolbox";
import ReportRow from "../Report/ReportRow";

const DataColumn = (props) => {
    return (
        <>
            {props.fields.map((element) => {
                return (
                    <ReportRow
                        key={element}
                        field={Toolbox.camelToCapitalized(element)}
                        data={props.object[element]}
                    />
                );
            })}
        </>
    );
};

export default DataColumn;
