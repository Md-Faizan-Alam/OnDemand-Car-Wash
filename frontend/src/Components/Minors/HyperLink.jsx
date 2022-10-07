import { Link } from "react-router-dom";

const HyperLink = (props) => {
    return (
        <div className="row">
            <div className="col text-center">
                <Link className="text-decoration-none text-decoration-underline hyper-link" to={props.to} onClick={props?.onClick}>
                    {props.text}
                </Link>
            </div>
        </div>
    );
};

export default HyperLink;

HyperLink.defaultProps = {
    text: "HyperLink",
    to: "/",
}
