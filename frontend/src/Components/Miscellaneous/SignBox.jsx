import { Link } from "react-router-dom";
const SignBox = (props) => {

    const handleLogout = ()=>{
        localStorage.setItem('JWT','');
    }
    
    const login = (
        <div className="d-flex">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item">
                    <Link
                        className="nav-link text-dark fs-5"
                        aria-current="page"
                        to={"/form"}
                    >
                        Login
                    </Link>
                </li>
                <li className="nav-item">
                    <Link
                        className="nav-link text-dark fs-5"
                        aria-current="page"
                        to={"/form/register"}
                    >
                        Sign Up
                    </Link>
                </li>
            </ul>
        </div>
    );

    const logout = (
        <div className="d-flex">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item">
                    <Link
                        onClick={handleLogout}
                        className="nav-link text-dark fs-5"
                        aria-current="page"
                        to={"/form"}
                    >
                        Logout
                    </Link>
                </li>
                <li className="nav-item mx-3">
                    <Link
                        className="nav-link text-dark fs-5"
                        aria-current="page"
                        to={"/user/profile"}
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="30"
                            height="30"
                            fill="currentColor"
                            className="bi bi-person-circle"
                            viewBox="0 0 16 16"
                        >
                            <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />
                            <path
                                fillRule="evenodd"
                                d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z"
                            />
                        </svg>
                    </Link>
                </li>
            </ul>
        </div>
    );

    return <>{localStorage.getItem('JWT') !== '' ? logout : login}</>;
};

export default SignBox;
