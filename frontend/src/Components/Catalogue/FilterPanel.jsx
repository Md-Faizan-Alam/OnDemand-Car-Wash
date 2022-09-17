import Toolbox from "../../Services/Toolbox";

const FilterPanel = (props) => {
    const minPriceButton = (price) => {
        return (
            <button
                onClick={() => props.setMinPrice(price)}
                type="button"
                className={`btn filter-tab py-0 ${
                    props.minPrice === price ? "bg-success text-light" : ""
                }`}
            >
                Rs. {price}
            </button>
        );
    };
    const maxPriceButton = (price) => {
        return (
            <button
                onClick={() => props.setMaxPrice(price)}
                type="button"
                className={`btn filter-tab py-0 ${
                    props.maxPrice === price ? "bg-success text-light" : ""
                }`}
            >
                Rs. {price}
            </button>
        );
    };
    const fieldButton = (fieldName) => {
        return (
            <button
                onClick={() => props.setField(fieldName)}
                type="button"
                className={`btn filter-tab py-0 ${
                    props.field === fieldName ? "bg-success text-light" : ""
                }`}
            >
                {Toolbox.capitalizeFirst(fieldName)}
            </button>
        );
    };

    return (
        <>
            <div
                className="container border position-sticky w-75 m-auto border-2 border-success rounded-3 shadow-lg shadow-success mt-2"
                style={{ height: "80vh", top: "10vh" }}
            >
                <div className="container bg mt-1" style={{ height: "40vh" }}>
                    <div className="row ps-3 fw-bold py-2">Sort By:</div>
                    <div className="row w-75 m-auto">
                        <div
                            className="btn-group-vertical"
                            role="group"
                            aria-label="Vertical button group"
                        >
                            {fieldButton("title")}
                            {fieldButton("price")}
                        </div>
                    </div>

                    <div className="row ps-3 mt-4 fw-bold py-2">Min Price:</div>
                    <div className="row w-75 m-auto">
                        <div
                            className="btn-group-vertical"
                            role="group"
                            aria-label="Vertical button group"
                        >
                            {minPriceButton(300)}
                            {minPriceButton(500)}
                            {minPriceButton(800)}
                        </div>
                    </div>

                    <div className="row ps-3 mt-4 fw-bold py-2">Max Price:</div>
                    <div className="row w-75 m-auto">
                        <div
                            className="btn-group-vertical"
                            role="group"
                            aria-label="Vertical button group"
                        >
                            {maxPriceButton(500)}
                            {maxPriceButton(800)}
                            {maxPriceButton(1000)}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default FilterPanel;
