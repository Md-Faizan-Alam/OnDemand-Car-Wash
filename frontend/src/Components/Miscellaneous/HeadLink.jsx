import { Link } from "react-router-dom";

const HeadLink = (props) => {
    return(
    <>
        <li className="nav-item">
                <Link
                    className="nav-link text-dark fs-5"
                    aria-current="page"
                    to={props.to}
                    onClick={props?.onClick}
                >
                    {props.name}
                </Link>
            </li>
    </>
    );
}

export default HeadLink;