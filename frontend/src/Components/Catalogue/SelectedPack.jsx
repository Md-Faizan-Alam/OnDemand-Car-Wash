import { Link } from 'react-router-dom';

const SelectedPack = (props) => {
    return (
        <>
            <div className="row mb-3 rounded-2 border border-success border-2">
                <div
                    className="col-4"
                    style={{
                        backgroundImage: `url(/pack-images/${props.pack.title?.replaceAll(
                            ' ',
                            '_'
                        )}.jpg)`,
                        backgroundSize: 'cover',
                    }}></div>
                <div className="col">
                    <div
                        className="row fs-5 py-2 ps-3 border-bottom border-dark border-2"
                        style={{ fontFamily: 'Bree Serif' }}>
                        {props.pack.title}
                    </div>
                    <div className="row py-2 ps-3">
                        {props.pack.description}
                    </div>
                    <div className="row py-3 justify-content-end">
                        <div className="col fs-5 fw-bold pt-2">
                            Rs.{props.pack.price}
                        </div>
                        <Link
                            to={'/packs'}
                            className="btn btn-outline-success w-25 px-0 me-3">
                            Change
                        </Link>
                    </div>
                </div>
            </div>
        </>
    );
};

export default SelectedPack;
