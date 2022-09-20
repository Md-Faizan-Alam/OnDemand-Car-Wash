const Fallback = {
    fallbackUser: {
        userId: null,
        firstName: null,
        lastName: null,
        email: null,
        phoneNumber: null,
        password: null,
        carIds: [],
        dateOfBirth: null,
        gender: null,
        role: null,
    },
    emptyOrder: {
        carId: null,
        washPackId: null,
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
    emptyCar: {
        carId: "0000",
        modelName: "No Car Found",
        carType: "",
        color: "#000000",
        registrationNumber: "",
    },
};

export default Fallback;
