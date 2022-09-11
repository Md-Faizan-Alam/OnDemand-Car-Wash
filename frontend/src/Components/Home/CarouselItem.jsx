import FeaturedCard from "./FeaturedCard";

const CarouselItem = (props) => {

    const getFeaturedCards = ()=>{
        let cards = [];
        for(let i=props.start;i<props.end;i++){
            cards.push(<FeaturedCard image={`WashPack_0${i+1}`} title={`Wash Pack ${i+1}`} />);
        }
        return cards;
    }

    return (
        <div className={`carousel-item ${props.active}`}>
            <div className="container-fluid py-5 d-flex justify-content-evenly">
                {getFeaturedCards()}
            </div>
        </div>
    );
};

export default CarouselItem;
