import Navbar from "../Miscellaneous/Navbar";
import AddOns from "./AddOns";

const AddOnPage = (props) => {
    return (
        <>
            <Navbar />
            <AddOns addButton={false} delete={false} />
        </>
    );
};

export default AddOnPage;
