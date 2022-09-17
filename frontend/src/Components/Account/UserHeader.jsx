import NewTabs from "./Tabs";

const UserHeader = (props) => {
    return(
    <>
        <div className="container-fluid pt-5 shadow">
            <div className="container m-auto">

                <div className="row fs-2">
                    <div className="col">
                        {props.user.firstName} {props.user.lastName}
                    </div>
                </div>

                <div className="row text-secondary">
                    <div className="col">
                        Some kind of description of the user
                    </div>
                </div>

                <div className="row mt-5">
                    <div className="col">
                        <NewTabs />
                    </div>
                </div>

            </div>
        </div>
    </>
    );
}

export default UserHeader;