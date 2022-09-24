import { useSelector } from "react-redux";

const Modal = (props) => {
    const modalState = useSelector(state=>state.modalState)

    return (
        <>
            <div
                className="modal fade"
                id="myModal"
                tabIndex="-1"
                aria-labelledby="myModalLabel"
                aria-hidden="true"
            >
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="py-3 ps-4">
                            <h5>{modalState.header}</h5>
                        </div>
                        <div className="py-4 ps-5 fs-5">
                            {modalState.body}
                        </div>
                        <div className="py-3 ps-4 d-flex justify-content-end">
                            <button
                                type="button"
                                className="btn btn-outline-danger me-3"
                                onClick={modalState.task}
                                data-bs-dismiss="modal"
                            >
                                Delete
                            </button>
                            <button
                                type="button"
                                className="btn btn-outline-success me-3"
                                data-bs-dismiss="modal"
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Modal;
