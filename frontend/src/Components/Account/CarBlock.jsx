import { useDispatch } from 'react-redux';
import { setCurrentCar } from '../../Actions/CurrentCarAction';
import { setModalState } from '../../Actions/ModalStateAction';
import setOrderStage from '../../Actions/OrderStageAction';
import CarService from '../../Services/CarService';
import Toolbox from '../../Services/Toolbox';
import DeleteButton from '../Minors/DeleteButton';
import SelectCar from '../Minors/SelectCar';

const CarBlock = (props) => {
    const dispatch = useDispatch();

    const selectCar = async () => {
        await CarService.getCarById(props.car.carId).then((response) =>
            dispatch(setCurrentCar(response))
        );
        dispatch(setOrderStage('book'));
    };

    const handleDelete = async (event) => {
        dispatch(
            setModalState({
                header: 'Confirm Deletion',
                body: 'Are you sure you want to delete this car ?',
                task: 'deleteCar',
                payload: props.car.carId,
            })
        );
    };

    return (
        <div
            className="container shadow border border-2 rounded border-dark mb-4"
            style={{
                width: '35vw',
                backgroundColor: 'rgba(5, 181, 34, 0.6)',
                height: 'max-content',
            }}>
            <div className="row" style={{ height: 'max-content' }}>
                <div
                    className="col-5"
                    style={{
                        backgroundImage: `url(/images/thumbnail.webp)`,
                        backgroundSize: 'cover',
                    }}></div>
                <div className="col">
                    <div className="row fs-4 ps-3 my-1">
                        <div className="col p-0">{props.car.modelName}</div>
                        <DeleteButton
                            onClick={handleDelete}
                            visible={props.delete}
                            className={'me-2'}
                        />
                    </div>
                    <div
                        className="row fs-6 mb-1 ms-1 "
                        style={{ width: 'max-content' }}>
                        Type: {Toolbox.snakeToNormal(props.car.carType)}
                    </div>

                    <div
                        className="row fs-6 mb-1 ms-1 "
                        style={{ width: 'max-content' }}>
                        Registration No: {props.car.registrationNumber}
                    </div>

                    <div
                        className="row align-items-center fs-6 mb-1 ms-1  py-1"
                        style={{ width: 'max-content' }}>
                        <div className="col p-0">Color:</div>
                        <div className="col">
                            <input
                                type="color"
                                defaultValue={props.car.color}
                                className="form-control form-control-color"
                                title="Choose your color"
                                style={{ width: '40px' }}
                                disabled
                            />
                        </div>
                    </div>
                    <SelectCar onClick={selectCar} visible={props.select} />
                </div>
            </div>
        </div>
    );
};

export default CarBlock;

CarBlock.defaultProps = {
    car: {
        imageUrl: '/Background-5.jpg',
        modelName: 'Model Name',
        carType: 'Car Type',
        color: 'green',
        registrationNumber: 'WB1234',
    },
};
