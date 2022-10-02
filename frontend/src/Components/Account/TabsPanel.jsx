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
                    to={"/user/myOrders"}
                    name={"Orders"}
                    visible={ ["CUSTOMER"].includes(props.role) }
                />
                <Tab
                    to={"/user/packs"}
                    name={"Wash Packs"}
                    visible={ ["ADMIN"].includes(props.role) }
                />
                <Tab
                    to={"/user/allOrders"}
                    name={"Orders"}
                    visible={ ["ADMIN","WASHER"].includes(props.role) }
                />
                <Tab
                    to={"/user/report"}
                    name={"Analysis"}
                    visible={ ["ADMIN"].includes(props.role) }
                />
            </div>
        </>
    );
};

export default TabsPanel;
