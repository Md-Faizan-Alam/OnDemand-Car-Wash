import Mapping from "../../Constants/Mapping";
import Tab from "./Tab";

const TabsPanel = (props) => {
    return (
        <>
            <div className="container">
                {Mapping.userTabs.map((element) => {
                    return (
                        <Tab
                            key={element.to}
                            to={element.to}
                            name={element.name}
                            visible={element.visible}
                            role={props.role}
                        />
                    );
                })}
            </div>
        </>
    );
};

export default TabsPanel;
