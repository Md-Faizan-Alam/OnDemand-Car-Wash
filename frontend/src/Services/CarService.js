import axios from "axios";

const CarService = {
    insertCar: async (car) => {
        const config = {
            headers: {
                "Authorization": localStorage.getItem('JWT')
            }
        }
        
        const data = await axios.post('http://localhost:8100/user/car/add',car,config)
        .then((response)=>response.data).catch((error)=>console.log(error))

        console.log(`Car Insertion: ${data}`)

    },

    getCarsByCustomer: async () => {
        const config = {
            headers: {
                "Authorization": localStorage.getItem('JWT')
            }
        }
        
        const data = await axios.get('http://localhost:8100/user/car/byCustomer',config)
        .then((response)=>response.data).catch((error)=>console.log(error))

        console.log(data)

        if(data === undefined) return null;
        return data;
    }
}

export default CarService;