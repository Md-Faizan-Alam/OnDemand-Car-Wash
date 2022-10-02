import { useSelector } from "react-redux";
import Packs from "../Catalogue/Packs";
import AddPack from "../Form/AddPack";

const WashPack = (props) => {
    const packStage = useSelector(state => state.packStage)

    const body = {
        "view": <Packs addButton={true} delete={true} />,
        "add": <AddPack /> ,
        "edit": <AddPack />
    }

    return(
    <>
        {body[packStage]}
    </>
    );
}

export default WashPack;