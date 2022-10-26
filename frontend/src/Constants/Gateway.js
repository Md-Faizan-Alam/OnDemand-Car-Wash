const Gateway = {
    baseURL: process.env.REACT_APP_BASE_URL,
    makePath: (...pathList) => {
        let fullPath = Gateway.baseURL;
        for (const path of pathList) {
            fullPath += "/" + path;
        }
        return fullPath;
    },
};

export default Gateway;
