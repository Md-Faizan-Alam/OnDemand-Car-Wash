import { useSelector } from "react-redux";
import BookWash from "../Form/BookWash";
import CarSelection from "./CarSelection";
import OrderList from "./OrderList";
import OrderPreview from "./OrderPreview";

const Order = (props) => {
    const orderStage = useSelector(state=>state.orderStage);

    const body = {
        "view": <OrderList />,
        "book": <BookWash />,
        "car": <CarSelection />,
        "preview": <OrderPreview />
    }

    return(
        <>
            {body[orderStage]}
        </>
    );
}

export default Order;