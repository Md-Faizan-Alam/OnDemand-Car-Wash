import Toolbox from "../../Services/Toolbox";

const CarBlock = (props) => {

    return (
        <div className="container shadow border border-2 rounded border-dark mb-4" style={{width: "35vw"}}>
            <div className="row" style={{height: "15vw"}}>
                <div className="col-5" style={{
                        backgroundImage: `url(/thumbnail.webp)`,
                        backgroundSize: "cover"
                    }}></div>
                <div className="col" style={{backgroundColor: "rgba(5, 181, 34, 0.6)"}}>
                    <div className="row fs-4 ps-3 my-1">{props.car.modelName}</div>
                    <div className="row fs-6 mb-1 ms-1 " style={{width: "max-content"}}>Type: {Toolbox.snakeToNormal(props.car.carType)}</div>

                    <div className="row fs-6 mb-1 ms-1 " style={{width: "max-content"}}>Registration No: {props.car.registrationNumber}</div>

                    <div className="row align-items-center fs-6 mb-1 ms-1  py-1" style={{width: "max-content"}}>
                        <div className="col p-0">
                            Color: 
                        </div>
                        <div className="col">
                        <input
                                type="color"
                                defaultValue={props.car.color}
                                className="form-control form-control-color"
                                title="Choose your color"
                                style={{width: "40px"}}
                                disabled
                            />
                        </div>
                    </div>
                    
                </div>
            </div>
        </div>
    );
};

export default CarBlock;

CarBlock.defaultProps = {
    car: {
        imageUrl: "/Background-5.jpg",
        modelName: "Model Name",
        carType: "Car Type",
        color: "green",
        registrationNumber: "WB1234"
    }
}
