const NavToggler = (props) => {
    return (
        <>
            <button
                className="navbar-toggler border-0 shadow-none"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target={`#${props.targetId}`}
            >
                <span className="navbar-toggler-icon"></span>
            </button>
        </>
    );
};

export default NavToggler;
