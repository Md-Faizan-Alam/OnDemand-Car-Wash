import axios from "axios";

export const validateUser = (username, password) => {
    return async (dispatch) => {
         const request = {
            "password": password,
            "username": username
        }
        console.log(request);
        
        const data = await axios.post(
            "http://localhost:8083/user/authenticate",
            request
        ).then((response)=>response.data).catch((error)=>console.log(error)
        );
        console.log("API Data: ", data);
        dispatch({
            type: "VALIDATE_USER",
            payload: data,
        });
    };
};
