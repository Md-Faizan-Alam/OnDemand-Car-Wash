import CarouselItem from "./CarouselItem";
import FeaturedCard from "./FeaturedCard";

const Carousel = (props) => {
    
    const getCarouselItem = () =>{
        let items = [];
        for(let i=0 ; i < props.list.length ; i+=3){
            items.push(<CarouselItem key={i} active={i===0 ? "active" : ""} list={props.list.slice(i,i+3)} />);
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

export default Carousel;
