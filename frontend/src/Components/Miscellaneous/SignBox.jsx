import ProfileSymbol from "../Static/ProfileSymbol";
import HeadLink from "./HeadLink";
const SignBox = (props) => {
    const handleLogout = () => {
        localStorage.setItem("JWT", "");
    };

    return (
        <ul className="navbar-nav mb-lg-0 position-absolute end-0 px-3">
            {localStorage.getItem("JWT") !== "" ? (
                <>
                    <HeadLink
                        name={"Logout"}
                        to={"/form"}
                        onClick={handleLogout}
                    />
                    <HeadLink name={<ProfileSymbol />} to={"/user/profile"} />
                </>
            ) : (
                <>
                    <HeadLink name={"Login"} to={"/form"} />
                    <HeadLink name={"Register"} to={"/form/register"} />
                </>
            )}
        </ul>
    );
};

export default SignBox;
