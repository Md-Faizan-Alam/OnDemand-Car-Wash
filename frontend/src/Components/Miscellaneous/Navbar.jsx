import { Link } from "react-router-dom";
import "../../App.css";
import NavToggler from "../Static/NavToggler";
import HeadLink from "./HeadLink";
import SignBox from "./SignBox";

const Navbar = (props) => {

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-white green-shadow">
            <div className="container-fluid">
                <Link
                    className="navbar-brand text-success ms-5 fs-4"
                    to={"/"}
                    style={{ fontFamily: "Bree Serif, serif" }}
                >
                    GreenWash &nbsp; |
                </Link>
                <NavToggler />
                <div
                    className="collapse navbar-collapse"
                    id="navbarSupportedContent"
                >
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <HeadLink name={"Home"} to={"/"} />
                        <HeadLink name={"About Us"} to={"/about"} />
                        <HeadLink name={"Contact Us"} to={"/contact"} />
                        <HeadLink name={"Book Now"} to={"/packs"} />
                    </ul>
                    <SignBox />
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
