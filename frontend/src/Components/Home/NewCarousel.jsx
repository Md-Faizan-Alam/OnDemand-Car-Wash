import Carousel from "./Carousel";
import CarouselItem from "./CarouselItem";

const NewCarousel = (props) => {

    const getCarouselItem = () =>{
        let items = [];
        for(let i=props.start ; i < props.end ; i+=3){
            items.push(<CarouselItem active={i===props.start ? "active" : ""} start={i} end={( i+3 < props.end ? i+3 : props.end )} />);
        }
        return items;
    }

    return (
        <div id={props.id} className="carousel slide" data-bs-ride="carousel">
            <div className="carousel-inner">
                
                {getCarouselItem()}

            </div>
            <button
                className="carousel-control-prev"
                type="button"
                data-bs-target={`#${props.id}`}
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
                data-bs-target={`#${props.id}`}
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

export default NewCarousel;