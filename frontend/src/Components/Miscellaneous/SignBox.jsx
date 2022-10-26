import ProfileSymbol from "../Static/ProfileSymbol";
import HeadLink from "./HeadLink";
const SignBox = (props) => {
    const handleLogout = () => {
        localStorage.setItem("JWT", "");
    };

    return (
        <ul className="navbar-nav ms-2 ms-lg-0">
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
