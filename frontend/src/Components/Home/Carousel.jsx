import Toolbox from "../../Services/Toolbox";

const Carousel = (props) => {

    const SlideButton = (localProps) => {
        return (
            <button
                className={`carousel-control-${localProps.direction}`}
                type="button"
                data-bs-target={`#${props.id}`}
                data-bs-slide={localProps.direction}
            >
                <span
                    className={`carousel-control-${localProps.direction}-icon`}
                    aria-hidden="true"
                ></span>
                <span className="visually-hidden">{localProps.direction}</span>
            </button>
        );
    };

    return (
        <div id={props.id} className="carousel slide" data-bs-ride="carousel">
            <div className="carousel-inner">
                {Toolbox.getCarouselItem(props.list, props.handleAction)}
            </div>
            <SlideButton direction={"prev"} />
            <SlideButton direction={"next"} />
        </div>
    );
};

export default Carousel;
