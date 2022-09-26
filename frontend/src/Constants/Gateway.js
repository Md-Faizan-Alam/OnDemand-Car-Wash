const Gateway = {
    baseURL: "http://localhost:8100",
    makePath: (...pathList) => {
        let fullPath = Gateway.baseURL;
        for (const path of pathList) {
            fullPath += "/" + path;
        }
        return fullPath;
    },
};

export default Gateway;
