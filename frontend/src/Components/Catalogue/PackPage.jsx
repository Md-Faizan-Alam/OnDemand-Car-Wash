import Navbar from "../Miscellaneous/Navbar";
import Packs from "./Packs";

const PackPage = (props) => {
    
    return (
        <>
            <Navbar />
            <Packs addButton={false} delete={false} />
        </>
    );
};

export default PackPage;
