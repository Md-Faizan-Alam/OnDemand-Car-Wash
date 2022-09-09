/* Deprecated : This component has been replaced by the Carousel */

import FeaturedCard from "./FeaturedCard";

const Featured = (props) => {
    return (
        <div className="conatiner-fluid py-5 d-flex justify-content-evenly">
            <FeaturedCard title={"Wash Pack 1"} description={"This whole part will be populated by the Wash Pack Description"} image={"WashPack_01"} />
            <FeaturedCard title={"Wash Pack 2"} description={"This whole part will be populated by the Wash Pack Description"} image={"WashPack_02"} />
            <FeaturedCard title={"Wash Pack 3"} description={"This whole part will be populated by the Wash Pack Description"} image={"WashPack_03"} />
        </div>
    );
};

export default Featured;
