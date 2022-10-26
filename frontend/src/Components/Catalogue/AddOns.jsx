import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { insertAddOnId } from "../../Actions/CurrentOrderAction";
import Fallback from "../../Constants/Fallback";
import WashPackService from "../../Services/WashPackService";
import FormIndicator from "../Form/FormIndicator";
import AddPackButton from "./AddPackButton";
import FilterPanel from "./FilterPanel";
import PackItem from "./PackItem";

const AddOns = (props) => {
    const refresh = useSelector((state) => state.refresh);
    const [list, setList] = useState([]);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [filter, setFilter] = useState(Fallback.addOnFilter);
    const [indicator, setIndicator] = useState("blank");

    const getTheList = async () => {
        setIndicator("spinner");
        const data = await WashPackService.getFilteredAddOns(filter);
        setIndicator("blank");
        setList(data.list);
    };

    const insertThisAddOn = (id) => {
        dispatch(insertAddOnId(id));
        navigate("/user/myOrders");
    };

    useEffect(() => {
        getTheList();
    }, [filter, refresh]);
    return (
        <>
            <div className="container-fluid pt-4">
                <FormIndicator indicator={indicator} />
            </div>
            <div className="container-fluid pt-1">
                <div className="row min-vh-1">
                    <div className="col-auto ps-5">
                        <FilterPanel filter={filter} setFilter={setFilter} />
                    </div>
                    <div className="col d-flex flex-wrap">
                        {list.map((element) => {
                            return (
                                <PackItem
                                    key={element.id}
                                    pack={element}
                                    action={"Add"}
                                    handleAction={insertThisAddOn}
                                />
                            );
                        })}
                        {props.addButton ? <AddPackButton /> : null}
                    </div>
                </div>
            </div>
        </>
    );
};

export default AddOns;
