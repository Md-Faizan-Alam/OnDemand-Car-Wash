import FieldButton from "../Minors/FieldButton";
import PriceButton from "../Minors/PriceButton";

const FilterPanel = (props) => {
    return (
        <div
            className="container d-none d-md-inline-block border w-fit pb-5 position-sticky m-auto border-2 border-success rounded-3 shadow-lg shadow-success mt-2 mb-5"
            style={{ top: "10vh" }}
        >
            <div className="container mt-1 d-flex flex-column">
                <div className="ps-3 fw-bold py-2">
                    Sort By:
                    <FieldButton
                        filter={props.filter}
                        fieldList={["title", "description", "price"]}
                        setFilter={props.setFilter}
                    />
                </div>

                <div className="ps-3 fw-bold py-2">
                    Min Price:
                    <PriceButton
                        name={"minPrice"}
                        filter={props.filter}
                        priceList={[300, 500, 800]}
                        setFilter={props.setFilter}
                    />
                </div>

                <div className="ps-3 fw-bold py-2">
                    Max Price:
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
