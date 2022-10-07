import Toolbox from "../Services/Toolbox";

const Fallback = {
    emptyUser: {
        firstName: "",
        lastName: "",
        email: "",
        phoneNumber: "",
        password: "",
        carIds: [],
        dateOfBirth: Toolbox.timeToDate(new Date()),
        gender: "",
        role: "CUSTOMER",
    },
    emptyOrder: {
        carId: null,
        washPackId: "0",
        addOnIdList: {
            stringList: [],
        },
        amount: 0.0,
        bookingTime: null,
        location: null,
        status: "PENDING",
        washerId: null,
        completionTime: null,
        customerFeedback: null,
        washerFeedback: null,
        bucketsOfWaterUsed: 0,
    },
    fallbackCar: {
        carId: "0000",
        modelName: "No Car Selected",
        carType: "",
        color: "#000000",
        registrationNumber: "",
    },
    emptyCar: {
        modelName: "",
        carType: "SEDAN",
        color: "#000000",
        registrationNumber: "",
    },
    idleModal: {
        header: "Title",
        body: "No body set for this modal",
        task: "doNothing",
        payload: null,
    },
    fallbackPack: {
        title: "No Pack Selected",
        description: "No description available",
        price: 0,
    },
    emptyPack: {
        id: null,
        title: "",
        description: "",
        price: 0,
    },
    emptyLocation: {
        lat: 0,
        lng: 0,
    },
    addOnFilter: {
        field: "price",
        minPrice: 300,
        maxPrice: 5000,
    },
    washPackFilter: {
        field: "price",
        minPrice: 300,
        maxPrice: 5000,
    },
    loadingUser: {
        firstName: "",
        lastName: "",
        email: "",
        phoneNumber: "",
        gender: "",
        dateOfBirth: "",
    },
};

export default Fallback;
