const NewAdvert = (props) => {
    return (
        <>
            <div className="d-flex flex-column flex-sm-row align-items-center justify-content-evenly mb-5">
                <div className="advert-new mx-2 h-max">
                    <h1 className="display-4 fw-normal">
                        Leave the dirt behind and move ahead
                    </h1>
                    <p className="fs-6">
                        We provide both remote and on-site Car wash services.
                        Our list of available Wash Packs is designed to suit
                        your needs in all kinds of situations.
                    </p>
                </div>
                <div className="advert-img" id={"advert-1"}></div>
            </div>
            <div className="d-flex flex-column-reverse flex-sm-row align-items-center justify-content-evenly mt-5">
                <div className="advert-img" id={"advert-2"}></div>
                <div className="advert-new mx-2 h-max">
                    <h1 className="display-4 fw-normal">
                        As quick as your ride
                    </h1>
                    <p className="fs-6">
                        Contacting us has never been easier. The mobile app
                        provides a more quick and reliant way of booking your
                        car wash ahead of time.
                    </p>
                </div>
            </div>
        </>
    );
};

export default NewAdvert;
