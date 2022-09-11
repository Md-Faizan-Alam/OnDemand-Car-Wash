import Advertisement from "./Advertisement";
import Carousel from "./Carousel";
import Footer from "../Footer";
import HomeCard from "./HomeCard";
import Navbar from "../Navbar";
import FeaturedCard from "./FeaturedCard";
import CarouselItem from "./CarouselItem";
import NewCarousel from "./NewCarousel";

const HomePage = (props) => {
    const washPackTitles = [];
    for (let i = 0; i < 9; i++) {
        washPackTitles.push(`WashPack ${i + 1}`);
    }
    const addOnTitles = [];
    for (let i = 0; i < 9; i++) {
        addOnTitles.push(`Add On ${i + 1}`);
    }
    const washPackDescriptionList = [];
    for (let i = 0; i < 9; i++) {
        washPackDescriptionList.push(
            "This is where the description of the given Wash Pack will appear"
        );
    }
    const addOnDescriptionList = [];
    for (let i = 0; i < 9; i++) {
        addOnDescriptionList.push(
            "This is where the description of the given Add On will appear"
        );
    }
    const washPackImages = [];
    for (let i = 0; i < 9; i++) {
        washPackImages.push(`WashPack_0${i + 1}`);
    }
    const addOnImages = [];
    for (let i = 0; i < 9; i++) {
        addOnImages.push(`AddOn_0${i + 1}`);
    }

    return (
        <>
            <Navbar />
            <HomeCard />
            <Carousel id={"washPackCarousel"} start={0} end={8} />
            {/* <Carousel id={"addOnCarousel"} start={0} end={9} /> */}
            <Advertisement />
            <Footer />
        </>
    );
};
export default HomePage;
