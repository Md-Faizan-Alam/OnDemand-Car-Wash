import { useRef, useState } from 'react';
import Pin from '../Static/Pin';

const Map = (props) => {
    const [position, setPosition] = useState({ top: 260, left: 260 });
    const [mouseDown, setMouseDown] = useState(false);
    const map = useRef();

    const getPosition = (event) => {
        let { top, left } = map.current.getBoundingClientRect();
        left = event.clientX - left - 20;
        top = event.clientY - top - 20;
        return { top, left };
    };

    const stopDrag = (event) => {
        const { top, left } = getPosition(event);
        props.setLocation({ lat: top / 10, lng: left / 5 });
        setMouseDown(false);
    };

    const touchedBorder = (top, left) => {
        return (
            left > map.current.offsetWidth - 40 ||
            left < 0 ||
            top > map.current.offsetHeight - 40 ||
            top < 0
        );
    };

    const handleMove = (event) => {
        if (!mouseDown) return;
        const { top, left } = getPosition(event);
        setPosition({ top, left });
        if (touchedBorder(top, left)) stopDrag(event);
    };

    return (
        <div
            ref={map}
            id="map"
            className="row mx-auto border mb-5 w-75 p-0"
            onMouseMove={handleMove}>
            <div
                className="position-relative ps-1 pt-1"
                style={{
                    width: '40px',
                    height: '40px',
                    top: position.top + 'px',
                    left: position.left + 'px',
                }}
                onMouseDown={() => setMouseDown(true)}
                onMouseUp={stopDrag}>
                <Pin />
            </div>
        </div>
    );
};

export default Map;
