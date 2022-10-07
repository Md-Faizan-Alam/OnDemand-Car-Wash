import { useRef } from "react";
import FeaturedCard from "./FeaturedCard";

const CarouselItem = (props) => {
    const serial = useRef(0);

    return (
        <div className={`carousel-item ${props.active}`}>
            <div className="container-fluid my-5 d-flex justify-content-evenly">
                {props.list.map((element) => {
                    serial.current++;
                    return (
                        <div key={serial.current}>
                            <FeaturedCard
                                pack={element}
                                handleAction={props.handleAction}
                            />
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default CarouselItem;
