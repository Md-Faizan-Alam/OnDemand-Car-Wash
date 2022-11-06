import { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { cancelOrder } from '../../Actions/CurrentOrderAction';
import setOrderStage from '../../Actions/OrderStageAction';
import Fallback from '../../Constants/Fallback';
import Secret from '../../Constants/Secrets';
import OrderService from '../../Services/OrderService';
import WashPackService from '../../Services/WashPackService';
import SelectedAddOns from '../Catalogue/SelectedAddOns';
import SelectedCar from '../Catalogue/SelectedCar';
import SelectedPack from '../Catalogue/SelectedPack';
import ActionRow from '../Minors/ActionRow';
import OrderTotal from '../Static/OrderTotal';
import FormIndicator from './FormIndicator';
import Map from './Map';

const BookWash = (props) => {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user);
    const currentOrder = useSelector((state) => state.currentOrder);
    const pack = useSelector((state) => state.currentPack);
    const car = useSelector((state) => state.currentCar);
    const [addOnList, setAddOnList] = useState([]);
    const [location, setlocation] = useState(Fallback.emptyLocation);
    const [indicator, setIndicator] = useState('blank');
    const [message, setMessage] = useState('');

    const total = useMemo(
        () => addOnList.reduce((sum, addOn) => sum + addOn.price, pack.price),
        [pack, addOnList]
    );

    const fetchAddOns = async () => {
        await WashPackService.getAddOnsByIds(currentOrder.addOnIdList).then(
            (response) => setAddOnList(response)
        );
    };
    useEffect(() => {
        fetchAddOns();
    }, [currentOrder]);

    const handleCancel = () => {
        dispatch(cancelOrder());
        dispatch(setOrderStage('view'));
    };

    const orderIsInvalid = () => {
        switch (true) {
            case car.carId === null:
                setMessage('Please select a car to proceed');
                break;
            case pack.id === '0':
                setMessage('Please select a Wash Pack to proceed');
                break;
            default:
                return false;
        }
        setIndicator('message');
        return true;
    };

    const handleCheckout = async () => {
        setIndicator('spinner');
        if (orderIsInvalid()) return;
        await handlePay();
    };

    const handleBook = async () => {
        let event = new Date(Date.now());
        const order = {
            ...currentOrder,
            washPackId: pack.id,
            carId: car.carId,
            location: location,
            bookingTime: event.toISOString(),
            amount: total,
        };
        await OrderService.insertOrder(order);
        setInvoice();
        dispatch(cancelOrder());
        dispatch(setOrderStage('preview'));
    };

    const setInvoice = () => {
        const order = {
            date: new Date(Date.now()).toLocaleDateString('fr-CH'),
            customerName: `${user.firstName} ${user.lastName}`,
            email: user.email,
            phoneNumber: user.phoneNumber,
            list: [pack, ...addOnList],
            amount: total,
            car: car.modelName,
            pack: pack.title,
            addOnList: addOnList.map((element) => element.title),
        };
        localStorage.setItem('order', JSON.stringify(order));
    };

    const handlePay = async () => {
        const paymentAmount = 100 * total;
        const paymentOrder = await OrderService.getRazorPayOrder(paymentAmount);
        const options = {
            key: Secret.getRazorPayKeyId(),
            amount: paymentAmount,
            currency: 'INR',
            name: 'GreenWash',
            order_id: paymentOrder.id,
            handler: handleBook,
            prefill: {
                name: `${user.firstName} ${user.lastName}`,
                email: user.email,
                contact: user.phoneNumber,
            },
        };
        const razorpay = new window.Razorpay(options);
        razorpay.on('payment.failed', (response) => {
            alert(response.error.description);
        });
        razorpay.open();
    };

    return (
        <div className="container my-5">
            <div className="container m-auto w-75">
                <SelectedCar car={car} />
                <SelectedPack pack={pack} />
                <SelectedAddOns addOnList={addOnList} />
                <Map setLocation={setlocation} />
                <OrderTotal total={total} />
                <FormIndicator indicator={indicator} message={message} />
                <ActionRow
                    actionName={'Checkout'}
                    handleAction={handleCheckout}
                    handleCancel={handleCancel}
                />
            </div>
        </div>
    );
};

export default BookWash;
