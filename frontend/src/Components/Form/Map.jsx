import { useState } from "react";

const Map = (props) => {
    const [top, setTop] = useState(260);
    const [left, setLeft] = useState(260);
    const [mouseDown, setMouseDown] = useState(false);
    const map = document.getElementById("map");

    const Pin = () => {
        return (
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width="30"
                height="30"
                fill="green"
                className="bi bi-geo-alt-fill"
                viewBox="0 0 16 16"
            >
                <path d="M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10zm0-7a3 3 0 1 1 0-6 3 3 0 0 1 0 6z" />
            </svg>
        );
    };

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
        <>
            <div
                id="map"
                className="container border mb-5 w-75 p-0"
                onMouseMove={handleMove}
                style={{
                    aspectRatio: "1/1",
                    backgroundImage: "url(/Map.png)",
                    backgroundSize: "contain",
                }}
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
        </>
    );
};

export default Map;
