import "../App.css";

const Navbar = (props) => {
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-white green-shadow">
            <div className="container-fluid">
                <a
                    className="navbar-brand text-success ms-5 fs-4"
                    href="#"
                    style={{fontFamily: "Bree Serif, serif"}}
                >
                    GreenWash &nbsp; |
                </a>
                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarSupportedContent"
                    aria-controls="navbarSupportedContent"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div
                    className="collapse navbar-collapse"
                    id="navbarSupportedContent"
                >
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <a
                                className="nav-link text-dark fs-5"
                                aria-current="page"
                                href="#"
                            >
                                Home
                            </a>
                        </li>
                        <li className="nav-item">
                            <a
                                className="nav-link text-dark fs-5"
                                aria-current="page"
                                href="#"
                            >
                                About Us
                            </a>
                        </li>
                        <li className="nav-item">
                            <a
                                className="nav-link text-dark fs-5"
                                aria-current="page"
                                href="#"
                            >
                                Contact Us
                            </a>
                        </li>
                        <li className="nav-item">
                            <a
                                className="nav-link text-dark fs-5"
                                aria-current="page"
                                href="#"
                            >
                                Book Now
                            </a>
                        </li>
                    </ul>
                    <div className="d-flex">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <a
                                    className="nav-link text-dark fs-5"
                                    aria-current="page"
                                    href="#"
                                >
                                    Login
                                </a>
                            </li>
                            <li className="nav-item">
                                <a
                                    className="nav-link text-dark fs-5"
                                    aria-current="page"
                                    href="#"
                                >
                                    Sign Up
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
