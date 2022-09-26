import { useEffect, useState } from "react";
import Mapping from "../../Constants/Mapping";
import CarService from "../../Services/CarService";
import WashPackService from "../../Services/WashPackService";

const OrderBlock = (props) => {
    const [packName, setPackName] = useState();
    const [carModel, setCarModel] = useState();

    const timeToDate = (str) => {
        let time = new Date(str);
        return time.toLocaleDateString("fr-CH");
    };

    const getNames = async () => {
        let name = null

        name = await WashPackService.getWashPackById(props.order.washPackId)
            .then((response) => response.title)
            .catch((error) => console.log(error));
        setPackName(name)

        name = await CarService.getCarById(props.order.carId)
            .then((response) => response.modelName)
            .catch((error) => console.log(error));
        setCarModel(name)
    };

    useEffect(() => {
        // getNames();
    }, []);

    return (
        <div
            className="container-fluid bg-gradient rounded py-3 mb-1"
            style={{
                backgroundColor: "rgba(170, 170, 170, 0.8)",
                fontWeight: 600,
            }}
        >
            <div className="row text-center">
                <div className="col-1">{props.serial}</div>
                <div className="col">{timeToDate(props.order.bookingTime)}</div>
                <div className="col">{props.order.washPackTitle}</div>
                <div className="col">{props.order.carName}</div>
                <div className="col">{props.order.amount}</div>
                <div className="col-2">
                    <div
                        className="py-1 rounded"
                        style={{
                            backgroundColor:
                                Mapping.statusColor[props.order.status],
                        }}
                    >
                        {props.order.status}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OrderBlock;
