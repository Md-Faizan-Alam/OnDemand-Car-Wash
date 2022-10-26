import { Link } from "react-router-dom";
import NavToggler from "../Static/NavToggler";
import HeadLink from "./HeadLink";
import SignBox from "./SignBox";

const Navbar = (props) => {
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-white green-shadow">
            <div className="container-fluid">
                <Link
                    className="navbar-brand text-success ps-1 ps-lg-3 fs-4"
                    to={"/"}
                    style={{ fontFamily: "Bree Serif, serif" }}
                >
                    GreenWash &nbsp; |
                </Link>
                <NavToggler targetId={"navbarSupportedContent"} />
                <div
                    className="collapse navbar-collapse"
                    id="navbarSupportedContent"
                >
                    <ul className="navbar-nav ms-2 ms-lg-0 me-lg-auto">
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
