import FeaturedCard from "./FeaturedCard";

const CarouselItem = (props) => {

    let serial = 0;

    return (
        <div className={`carousel-item ${props.active}`}>
            <div className="container-fluid py-5 d-flex justify-content-evenly">
                {props.list.map((element)=>{
                    serial++;
                    return (
                        <div key={serial}>
                            <FeaturedCard pack={element} />
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default CarouselItem;
