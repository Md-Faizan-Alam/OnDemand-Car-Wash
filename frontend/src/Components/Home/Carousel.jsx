import Toolbox from "../../Services/Toolbox";

const Carousel = (props) => {
    const SlideButton = (localProps) => {
        return (
            <button
                className={`carousel-control-${localProps.direction}`}
                type="button"
                data-bs-target={`#${localProps.id}`}
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
        <div
            id={props.id}
            className="carousel slide"
            data-bs-ride="carousel"
            style={props.list?.length === 0 ? { display: "none" } : null}
        >
            <div className="carousel-inner">
                {Toolbox.getCarouselItem(props.list, props.handleAction)}
            </div>
            <SlideButton direction={"prev"} id={props.id} />
            <SlideButton direction={"next"} id={props.id} />
        </div>
    );
};

export default Carousel;
