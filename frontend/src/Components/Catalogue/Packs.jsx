import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import WashPackService from "../../Services/WashPackService";
import Navbar from "../Miscellaneous/Navbar";
import FilterPanel from "./FilterPanel";
import PackItem from "./PackItem";
import FormIndicator from '../Form/FormIndicator';

const Packs = (props) => {
    const signed = useSelector((state) => state.signed);
    const [list, setList] = useState([]);

    const [field, setField] = useState("price");
    const [minPrice, setMinPrice] = useState(300);
    const [maxPrice, setMaxPrice] = useState(1000);
    const [indicator, setIndicator] = useState("blank")

    const getTheList = async() =>{
        setIndicator("spinner")
            const filter = {
                minPrice: minPrice,
                maxPrice: maxPrice,
                sortBy: field
            }
            console.log(filter)
            const data = await WashPackService.getFilteredWashPacks(filter);
            setIndicator("blank")
            console.log(data.list);
            setList(data.list);
    }

    useEffect(() => {
        getTheList()
    }, [field,minPrice,maxPrice]);

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
                            return <PackItem key={element.id} pack={element} />;
                        })}
                    </div>
                </div>
            </div>
        </>
    );
};

export default Packs;
