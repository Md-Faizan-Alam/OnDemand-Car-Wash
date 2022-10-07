import FieldButton from "../Minors/FieldButton";
import PriceButton from "../Minors/PriceButton";

const FilterPanel = (props) => {
    return (
        <div className="col-4 pt-5">
            <div
                className="container bg-light border position-sticky w-75 m-auto border-2 border-success rounded-3 shadow-lg shadow-success mt-2 mb-5"
                style={{ height: "80vh", top: "10vh", maxWidth: "15vw" }}
            >
                <div className="container bg mt-1" style={{ height: "40vh" }}>
                    <div className="row ps-3 fw-bold py-2">Sort By:</div>
                    <FieldButton
                        filter={props.filter}
                        fieldList={["title", "description", "price"]}
                        setFilter={props.setFilter}
                    />

                    <div className="row ps-3 mt-4 fw-bold py-2">Min Price:</div>
                    <PriceButton
                        name={"minPrice"}
                        filter={props.filter}
                        priceList={[300, 500, 800]}
                        setFilter={props.setFilter}
                    />

                    <div className="row ps-3 mt-4 fw-bold py-2">Max Price:</div>
                    <PriceButton
                        name={"maxPrice"}
                        filter={props.filter}
                        priceList={[1000, 2000, 5000]}
                        setFilter={props.setFilter}
                    />
                </div>
            </div>
        </div>
    );
};

export default FilterPanel;
