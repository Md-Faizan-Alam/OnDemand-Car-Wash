import { useState } from "react";
import Pin from "../Static/Pin";

const Map = (props) => {
    const [top, setTop] = useState(260);
    const [left, setLeft] = useState(260);
    const [mouseDown, setMouseDown] = useState(false);
    const map = document.getElementById("map");

    const stopDrag = (event) => {
        let corner = map.getBoundingClientRect();
        props.setLocation({
            lat: (event.clientY - corner.top - 20) / 10,
            lng: (event.clientX - corner.left - 20) / 5,
        });
        setMouseDown(false);
    };

    const handleMove = (event) => {
        let corner = map.getBoundingClientRect();
        if (mouseDown) {
            let xPosition = event.clientX - corner.left - 20;
            let yPosition = event.clientY - corner.top - 20;
            setLeft(xPosition);
            setTop(yPosition);
            if (
                xPosition > map.offsetWidth - 40 ||
                xPosition < 0 ||
                yPosition > map.offsetHeight - 40 ||
                yPosition < 0
            ) {
                stopDrag(event);
            }
        }
    };

    return (
        <div
            id="map"
            className="row mx-auto border mb-5 w-75 p-0"
            onMouseMove={handleMove}
        >
            <div
                className="position-relative ps-1 pt-1"
                style={{
                    width: "40px",
                    height: "40px",
                    top: top + "px",
                    left: left + "px",
                }}
                onMouseDown={() => setMouseDown(true)}
                onMouseUp={stopDrag}
            >
                <Pin />
            </div>
        </div>
    );
};

export default Map;
