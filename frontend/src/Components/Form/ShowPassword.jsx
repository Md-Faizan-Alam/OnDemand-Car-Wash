import Path from "../../Constants/Path";

const ShowPassword = (props) => {
    return (
        <>
            <div className="col-1 px-0 mx-0">
                <button
                    className="bg-white border-0"
                    onClick={() => {
                        props.setVisible((wasVisible) => !wasVisible);
                    }}
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="currentColor"
                        className={`bi bi-eye${props.visible ? "-slash" : ""}`}
                        viewBox="0 0 16 16"
                    >
                        {props.visible ? Path.eyeSlashPath : Path.eyePath}
                    </svg>
                </button>
            </div>
        </>
    );
};

export default ShowPassword;

ShowPassword.defaultProps = {
    visible: false,
};
