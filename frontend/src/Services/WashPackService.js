import axios from "axios";

const WashPackService = {
    getAllWashPacks: async ()=>{
        return await axios.get('http://localhost:8100/washer/WashPack/list')
        .then((response)=>response.data)
        .catch((error)=>console.log(error));
    },
    getFilteredWashPacks: async (filter)=>{
        return await axios.post('http://localhost:8100/washer/WashPack/filter',filter)
        .then((response)=>response.data)
        .catch((error)=>console.log(error));
    }

}

export default WashPackService;