import InfoRow from "./InfoRow";

const Profile = (props) => {
    return (
        <div className="container p-5 tab-component">
            <InfoRow
                field={"Name"}
                data={"John Doe"}
                rowClass={"border-top border-2 border-success"}
            />
            <InfoRow field={"Email"} data={"johndoe@gmail.com"} />
            <InfoRow field={"Phone"} data={"1234567890"} />
            <InfoRow field={"Gender"} data={"Male"} />
            <InfoRow field={"Birthday"} data={"10 September"} />
        </div>
    );
};

export default Profile;
