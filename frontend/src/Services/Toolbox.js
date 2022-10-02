import CarouselItem from "../Components/Home/CarouselItem";

const Placeholder = () =>{
    return(
         <span className="placeholder px-5"></span>
    )
}

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
    },
    loadString: (str)=>{
        if(str === ""){
            return <Placeholder />
        }
        return str
    },
    timeToDate: (str) => {
        let time = new Date(str);
        return time.toLocaleDateString("fr-CH");
    },

    getCarouselItem: (packList,handleAction) => {
        let items = [];
        for (let i = 0; i < packList.length; i += 3) {
            items.push(
                <CarouselItem
                    key={i}
                    active={i === 0 ? "active" : ""}
                    list={packList.slice(i, i + 3)}
                    handleAction={handleAction}
                />
            );
        }
        return items;
    },
}
export default Toolbox;