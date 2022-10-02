import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import WashPackService from "../../Services/WashPackService";
import FilterPanel from "./FilterPanel";
import PackItem from "./PackItem";
import setOrderStage from "../../Actions/OrderStageAction";
import { useNavigate } from "react-router-dom";
import { setWashPackId } from "../../Actions/CurrentOrderAction";
import FormIndicator from "../Form/FormIndicator";
import AddPackButton from "./AddPackButton";
import { setPackStage } from "../../Actions/PackStageAction";
import { setCurrentPack } from "../../Actions/CurrentPackAction";

const Packs = (props) => {
    const user = useSelector(state=>state.user)
    const refresh = useSelector(state=>state.refresh);
    const [list, setList] = useState([]);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [field, setField] = useState("price");
    const [minPrice, setMinPrice] = useState(300);
    const [maxPrice, setMaxPrice] = useState(5000);
    const [indicator, setIndicator] = useState("blank")

    const getTheList = async () => {
        const filter = {
            minPrice: minPrice,
            maxPrice: maxPrice,
            sortBy: field,
        };
        const data = await WashPackService.getFilteredWashPacks(filter);
        setList(data.list);
    };
    
    useEffect(() => {
       setIndicator("spinner");
        getTheList();
       setIndicator("blank");
    }, [field, minPrice, maxPrice,refresh]);

    const handleBook = (id) => {
        console.log("entered handleBook");
        dispatch(setWashPackId(id));
        dispatch(setOrderStage("book"));
        navigate("/user/myOrders");
    };

    const handleEdit = (id)=>{
        dispatch(setCurrentPack(list.filter((pack)=>pack["id"] === id)[0]))
        dispatch(setPackStage("edit"));
    }

    return (
        <>
            <FormIndicator indicator={indicator} />
            <div className="container-fluid pt-1 pe-5 ps-0">
                <div className="row" style={{ minHeight: "100vh" }}>
                    <div className="col-4 pt-5">
                        <FilterPanel
                            field={field}
                            minPrice={minPrice}
                            maxPrice={maxPrice}
                            setField={setField}
                            setMinPrice={setMinPrice}
                            setMaxPrice={setMaxPrice}
                        />
                    </div>
                    <div className="col-8 py-5 d-flex justify-content-start flex-wrap">
                        {list.map((element) => {
                            return (
                                <PackItem
                                    key={element.id}
                                    pack={element}
                                    action={user.role==="ADMIN" ? "Edit" : "Book"}
                                    handleAction={user.role==="ADMIN" ? handleEdit : handleBook}
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
