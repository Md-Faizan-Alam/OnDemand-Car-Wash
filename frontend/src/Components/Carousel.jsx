import FeaturedCard from "./FeaturedCard";

const Carousel = (props) => {
    return (
        <div
            id="carouselExampleControls"
            className="carousel slide"
            data-bs-ride="carousel"
        >
            <div className="carousel-inner">
                <div className="carousel-item active">
                    <div className="container-fluid py-5 d-flex justify-content-evenly">
                        <FeaturedCard
                            title={"Wash Pack 1"}
                            description={
                                "This whole part will be populated by the Wash Pack Description"
                            }
                            image={"WashPack_01"}
                        />
                        <FeaturedCard
                            title={"Wash Pack 2"}
                            description={
                                "This whole part will be populated by the Wash Pack Description"
                            }
                            image={"WashPack_02"}
                        />
                        <FeaturedCard
                            title={"Wash Pack 3"}
                            description={
                                "This whole part will be populated by the Wash Pack Description"
                            }
                            image={"WashPack_03"}
                        />
                    </div>
                </div>
                <div className="carousel-item">
                    <div className="container-fluid py-5 d-flex justify-content-evenly">
                        <FeaturedCard
                            title={"Wash Pack 4"}
                            description={
                                "This whole part will be populated by the Wash Pack Description"
                            }
                            image={"WashPack_04"}
                        />
                        <FeaturedCard
                            title={"Wash Pack 5"}
                            description={
                                "This whole part will be populated by the Wash Pack Description"
                            }
                            image={"WashPack_05"}
                        />
                        <FeaturedCard
                            title={"Wash Pack 6"}
                            description={
                                "This whole part will be populated by the Wash Pack Description"
                            }
                            image={"WashPack_06"}
                        />
                    </div>
                </div>
                <div className="carousel-item">
                    <div className="container-fluid py-5 d-flex justify-content-evenly">
                        <FeaturedCard
                            title={"Wash Pack 7"}
                            description={
                                "This whole part will be populated by the Wash Pack Description"
                            }
                            image={"WashPack_07"}
                        />
                        <FeaturedCard
                            title={"Wash Pack 8"}
                            description={
                                "This whole part will be populated by the Wash Pack Description"
                            }
                            image={"WashPack_08"}
                        />
                        <FeaturedCard
                            title={"Wash Pack 9"}
                            description={
                                "This whole part will be populated by the Wash Pack Description"
                            }
                            image={"WashPack_09"}
                        />
                    </div>
                </div>
            </div>
            <button
                className="carousel-control-prev"
                type="button"
                data-bs-target="#carouselExampleControls"
                data-bs-slide="prev"
            >
                <span
                    className="carousel-control-prev-icon"
                    aria-hidden="true"
                ></span>
                <span className="visually-hidden">Previous</span>
            </button>
            <button
                className="carousel-control-next"
                type="button"
                data-bs-target="#carouselExampleControls"
                data-bs-slide="next"
            >
                <span
                    className="carousel-control-next-icon"
                    aria-hidden="true"
                ></span>
                <span className="visually-hidden">Next</span>
            </button>
        </div>
    );
};

export default Carousel;
