import { useSelector } from "react-redux";
import BookWash from "../Form/BookWash";
import OrderList from "./OrderList";

const Order = (props) => {
    const orderStage = useSelector(state=>state.orderStage);

    const body = {
        "view": <OrderList />,
        "book": <BookWash />
    }

    return(
        <>
            {body[orderStage]}
        </>
    );
}

export default Order;