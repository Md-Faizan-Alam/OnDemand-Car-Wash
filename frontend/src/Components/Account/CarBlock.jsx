import InfoRow from "./InfoRow";

const CarBlock = (props) => {

    return (
        <div className="card mb-3" style={{ width: "35vw" }}>
            <div className="row">
                <div
                    className="col-4"
                    style={{
                        backgroundImage: `url(${props.imageUrl})`,
                        backgroundSize: "cover",
                    }}
                ></div>

                <div className="col-8">
                    <div className="card-body">
                        <h5 className="card-title">{props.modelName}</h5>
                        <div className="row">
                            <span className="text-success">Type: <span className="text-dark">{props.carType}</span></span>
                        </div>
                        <div className="row">
                            <span className="text-success">Colour: <div className="d-inline px-3" style={{backgroundColor: props.color}}></div></span>
                        </div>
                        <div className="row">
                            <span className="text-success">Registration No.: <span className="text-dark">{props.registrationNumber}</span></span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CarBlock;

CarBlock.defaultProps = {
    imageUrl: "/Background-5.jpg",
    modelName: "Model Name",
    carType: "Car Type",
    color: "green",
    registrationNumber: "WB1234"
}
