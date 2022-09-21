import Tab from "./Tab";

const TabsPanel = (props) => {

    return (
        <>
            <div className="container">
                <Tab
                    to={"/user/profile"}
                    name={"Profile"}
                    visible={ ["CUSTOMER","ADMIN","WASHER"].includes(props.role) }
                />
                <Tab
                    to={"/user/cars"}
                    name={"Cars"}
                    visible={ ["CUSTOMER"].includes(props.role) }
                />
                <Tab
                    to={"/user/orders"}
                    name={"Orders"}
                    visible={ ["CUSTOMER"].includes(props.role) }
                />
                <Tab
                    to={"/user/packs"}
                    name={"Wash Packs"}
                    visible={ ["ADMIN"].includes(props.role) }
                />
            </div>
        </>
    );
};

export default TabsPanel;
