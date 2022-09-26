import { useEffect, useState } from "react";
import WashPackService from "../../Services/WashPackService";
import Advertisement from "./Advertisement";
import Carousel from "./Carousel";
import HomeCard from "./HomeCard";
import Footer from "../Miscellaneous/Footer";
import Navbar from "../Miscellaneous/Navbar";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { insertAddOnId, setWashPackId } from "../../Actions/CurrentOrderAction";
import setOrderStage from "../../Actions/OrderStageAction";

const HomePage = (props) => {
    const [washPacklist, setWashPackList] = useState([]);
    const [addOnList,setAddOnList] = useState([]);

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleBook = (id) => {
        console.log("entered handleBook");
        dispatch(setWashPackId(id));
        dispatch(setOrderStage("book"));
        navigate("/user/orders");
    };

    const selectAddOn = (id)=>{
        dispatch(insertAddOnId(id));
        dispatch(setOrderStage("book"));
        navigate("/user/orders");
    }

    const getPacks = async () => {
        let data = await WashPackService.getAllWashPacks();
        setWashPackList(data.list);
        data = await WashPackService.getAllAddOns();
        setAddOnList(data.list)
    };

    useEffect(() => {
        getPacks();
    }, []);

    return (
        <>
            <Navbar />
            <HomeCard />
            <Carousel id={"washPackCarousel"} list={washPacklist} handleAction={handleBook} />
            <Carousel id={"addOnCarousel"} list={addOnList} handleAction={selectAddOn} />
            <Advertisement />
            <Footer />
        </>
    );
};
export default HomePage;
