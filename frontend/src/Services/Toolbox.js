const Toolbox = {
    snakeToNormal: (str)=>{
        let newStr = ""+str;
        str = newStr.charAt(0) + newStr.slice(1).replaceAll("_"," ").toLowerCase()
        return str;
    },
    truncateText: (str)=>{
        let newStr = ""+str
        str = newStr.slice(0,90)
        return str
    },
    checkSigned: ()=>{
        return localStorage.getItem('JWT').length !== 0
    },
    capitalizeFirst: (str) =>{
        let newStr = ""+str;
        str = newStr.charAt(0).toUpperCase() + newStr.slice(1)
        return str;
    }
}
export default Toolbox;