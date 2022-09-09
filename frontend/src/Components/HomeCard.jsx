import LoginForm from "./LoginForm";
import Welcome from "./Welcome";

const HomeCard = (props) => {
    return (
        <div className="container-fluid bg-danger home-card">
            <Welcome />
            {/* <LoginForm /> */}
        </div>
    );
};

export default HomeCard;
