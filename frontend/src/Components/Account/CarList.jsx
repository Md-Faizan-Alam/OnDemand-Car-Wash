import CarBlock from "./CarBlock";

const carList = [
    {
        modelName: "Audi R8",
        carType: "Coupe",
        color: "#FFFFFF",
        registrationNumber: "WB3406"
    },
    {
        modelName: "Maruti Suzuki Alto",
        carType: "Hatchback",
        color: "#892738",
        registrationNumber: "WB9495"
    },
    {
        modelName: "Mahindra Scorpio",
        carType: "SUV",
        color: "#DDDDDD",
        registrationNumber: "WB4789"
    }
]



const CarList = (props) => {
    return (
        <div className="container p-5 tab-component d-flex justify-content-between flex-wrap">
            {carList.map((element)=>{
                return(
                    <CarBlock modelName={element.modelName} carType={element.carType} color={element.color} registrationNumber={element.registrationNumber}/>
                );
            })}
        </div>
    );
};

export default CarList;
