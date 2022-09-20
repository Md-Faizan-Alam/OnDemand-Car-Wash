import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { insertAddOnId } from "../../Actions/CurrentOrderAction";
import WashPackService from "../../Services/WashPackService";
import FormIndicator from "../Form/FormIndicator";
import Navbar from "../Miscellaneous/Navbar";
import FilterPanel from "./FilterPanel";
import PackItem from "./PackItem";


const AddOns = (props) => {
    const signed = useSelector((state) => state.signed);
    const [list, setList] = useState([]);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [field, setField] = useState("price");
    const [minPrice, setMinPrice] = useState(300);
    const [maxPrice, setMaxPrice] = useState(5000);
    const [indicator, setIndicator] = useState("blank");

    const getTheList = async () => {
        setIndicator("spinner");
        const filter = {
            minPrice: minPrice,
            maxPrice: maxPrice,
            sortBy: field,
        };
        const data = await WashPackService.getFilteredAddOns(filter);
        setIndicator("blank");
        setList(data.list);
    };
    
    const insertThisAddOn = (id) =>{
        dispatch(insertAddOnId(id))
        navigate("/user/orders")
    }

    useEffect(() => {
        getTheList();
    }, [field, minPrice, maxPrice]);

    return (
        <>
            <Navbar condition={signed} />
            <FormIndicator indicator={indicator} />
            <div className="container-fluid pt-1">
                <div className="row" style={{ minHeight: "100vh" }}>
                    <div className="col-3 pt-5">
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
                            return <PackItem key={element.id} pack={element} action={"Add"} handleAction={insertThisAddOn} />;
                        })}
                    </div>
                </div>
            </div>
        </>
    );
};

export default AddOns;
