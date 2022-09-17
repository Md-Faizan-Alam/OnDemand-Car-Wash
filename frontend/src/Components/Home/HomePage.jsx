import { useEffect, useState } from "react";
import WashPackService from "../../Services/WashPackService";
import Advertisement from "./Advertisement";
import Carousel from "./Carousel";
import HomeCard from "./HomeCard";
import Footer from '../Miscellaneous/Footer';
import Navbar from '../Miscellaneous/Navbar';
import { useSelector } from "react-redux";

const HomePage = (props) => {

    const [list, setList] = useState([]);

    useEffect(() => {
        return async ()=>{
            const data = await WashPackService.getAllWashPacks();
            console.log(data.list);
            setList(data.list);
        }
    },[])
    

    return (
        <>
            <Navbar />
            <HomeCard />
            <Carousel id={"washPackCarousel"} list={list}/>
            {/* <Carousel id={"addOnCarousel"} list={addOnlist} /> */}
            <Advertisement />
            <Footer />
        </>
    );
};
export default HomePage;
