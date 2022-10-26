import FieldButton from "../Minors/FieldButton";
import PriceButton from "../Minors/PriceButton";

const CollapsedFilterPanel = (props) => {
    return (
        <>
            <div
                className="container d-md-none p-0 border w-vw-75 position-sticky m-auto border-2 border-success rounded-3 mt-2 mb-5"
                style={{ top: "10vh" }}
            >
                <button
                    className="filter-collapse rounded-3 border-0 w-100 px-3 py-2 text-start position-relative bg-transparent"
                    data-bs-toggle="collapse"
                    data-bs-target="#filterBody"
                >
                    Filter
                </button>
                <div class="collapse" id="filterBody">
                    <div className="container w-fit mx-0 mt-1 d-flex flex-wrap">
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
            </div>
        </>
    );
};

export default CollapsedFilterPanel;
