import { useSelector } from "react-redux";
import Navbar from "../Miscellaneous/Navbar";
import Packs from "./Packs";

const PackPage = (props) => {
    const signed = useSelector((state) => state.signed);

    return (
        <>
            <Navbar condition={signed} />
            <Packs addButton={false} />
        </>
    );
};

export default PackPage;
