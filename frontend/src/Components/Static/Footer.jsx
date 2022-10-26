import { Link } from "react-router-dom";

const Footer = (props) => {
    return (
        <>
            <div className="container-fluid" id="footer">
                <div className="row px-5 m-0">
                    <div className="col text-end py-2">
                        <Link
                            className="navbar-brand text-success ps-1 ps-lg-3 fs-2"
                            to={"/"}
                            style={{ fontFamily: "Bree Serif, serif" }}
                        >
                            GreenWash &nbsp; |
                        </Link>
                    </div>
                    <div className="col-9">
                        <div className="row ps-5">
                        <div className="col-auto mx-5">
                            <div className="row fw-bold fs-5">Links</div>
                            <Link to={"/Home"} className="row my-2 text-black hover-underline">Home</Link>
                            <Link to={"/About Us"} className="row my-2 text-black hover-underline">About Us</Link>
                            <Link to={"/Contact Us"} className="row my-2 text-black hover-underline">Contact Us</Link>
                            <Link to={"/Blog"} className="row my-2 text-black hover-underline">Blog</Link>
                            <Link to={"/Book Now"} className="row my-2 text-black hover-underline">Book Now</Link>
                            <Link to={"/Schedule Later"} className="row my-2 text-black hover-underline">Schedule Later</Link>
                        </div>
                        <div className="col-auto mx-5">
                            <div className="row fw-bold fs-5">Guides</div>
                            <Link to={"/How it Works?"} className="row my-2 text-black hover-underline">How it Works?</Link>
                            <Link to={"/Registration"} className="row my-2 text-black hover-underline">Registration</Link>
                            <Link to={"/Legal Terms"} className="row my-2 text-black hover-underline">Legal Terms</Link>
                            <Link to={"/Technical Terms"} className="row my-2 text-black hover-underline">Technical Terms</Link>
                        </div>
                        <div className="col-auto mx-5">
                            <div className="row fw-bold fs-5">Community</div>
                            <Link to={"/FAQ"} className="row my-2 text-black hover-underline">FAQ</Link>
                            <Link to={"/Forums"} className="row my-2 text-black hover-underline">Forums</Link>
                        </div>
                        <div className="col-auto mx-5">
                            <div className="row fw-bold fs-5">Social</div>
                            <Link to={"/Facebook"} className="row my-2 text-black hover-underline">Facebook</Link>
                            <Link to={"/Instagram"} className="row my-2 text-black hover-underline">Instagram</Link>
                            <Link to={"/Whatsapp"} className="row my-2 text-black hover-underline">Whatsapp</Link>
                            <Link to={"/Twitter"} className="row my-2 text-black hover-underline">Twitter</Link>
                        </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Footer;
