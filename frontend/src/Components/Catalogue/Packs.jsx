import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setWashPackId } from "../../Actions/CurrentOrderAction";
import { setCurrentPack } from "../../Actions/CurrentPackAction";
import setOrderStage from "../../Actions/OrderStageAction";
import { setPackStage } from "../../Actions/PackStageAction";
import Fallback from "../../Constants/Fallback";
import WashPackService from "../../Services/WashPackService";
import FormIndicator from "../Form/FormIndicator";
import AddPackButton from "./AddPackButton";
import FilterPanel from "./FilterPanel";
import PackItem from "./PackItem";

const Packs = (props) => {
    const role = useSelector((state) => state.user.role);
    const refresh = useSelector((state) => state.refresh);
    const [list, setList] = useState([]);
    const [filter, setFilter] = useState(Fallback.washPackFilter);
    const [indicator, setIndicator] = useState("blank");
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const getTheList = async () => {
        setIndicator("spinner");
        const data = await WashPackService.getFilteredWashPacks(filter);
        setIndicator("blank");
        setList(data.list);
    };

    const handleBook = (id) => {
        console.log("entered handleBook");
        dispatch(setWashPackId(id));
        dispatch(setOrderStage("book"));
        navigate("/user/myOrders");
    };

    const handleEdit = (id) => {
        dispatch(setCurrentPack(list.filter((pack) => pack["id"] === id)[0]));
        dispatch(setPackStage("edit"));
    };

    useEffect(() => {
        getTheList();
    }, [filter, refresh]);

    return (
        <>
            <FormIndicator indicator={indicator} />

            <div className="container-fluid pt-1 pe-5 ps-0">
                <div className="row min-vh-100">
                    <FilterPanel filter={filter} setFilter={setFilter} />

                    <div className="col-8 py-5 d-flex justify-content-start flex-wrap">
                        {list.map((element) => {
                            return (
                                <PackItem
                                    key={element.id}
                                    pack={element}
                                    action={role === "ADMIN" ? "Edit" : "Book"}
                                    handleAction={
                                        role === "ADMIN"
                                            ? handleEdit
                                            : handleBook
                                    }
                                    delete={props.delete}
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

export default Packs;
