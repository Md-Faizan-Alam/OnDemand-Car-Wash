import CarouselItem from "../Components/Home/CarouselItem";

const Placeholder = () => {
    return <span className="placeholder px-5"></span>;
};

const Toolbox = {
    snakeToNormal: (str) => {
        let newStr = "" + str;
        str =
            newStr.charAt(0) +
            newStr.slice(1).replaceAll("_", " ").toLowerCase();
        return str;
    },
    truncateText: (str) => {
        let newStr = "" + str;
        str = newStr.slice(0, 90);
        return str;
    },
    checkSigned: () => {
        return localStorage.getItem("JWT").length !== 0;
    },
    capitalizeFirst: (str) => {
        let newStr = "" + str;
        str = newStr.charAt(0).toUpperCase() + newStr.slice(1);
        return str;
    },
    camelToCapitalized: (word) => {
        word = [...word].reduce((accumulator, letter) =>
            letter >= "A" && letter <= "Z"
                ? accumulator + " " + letter
                : accumulator + letter
        );
        word = word.charAt(0).toUpperCase() + word.slice(1);
        return word;
    },
    titleToUrl: (title) => {
        return `url(/pack-images/${title.replaceAll(" ", "_")}.jpg)`;
    },
    loadString: (str) => {
        if (str === "") {
            return <Placeholder />;
        }
        return str;
    },
    timeToDate: (str) => {
        let time = new Date(str);
        return time.toLocaleDateString("fr-CH");
    },

    getCarouselItem: (packList, handleAction) => {
        let items = [];
        for (let i = 0; i < packList.length; i += 3) {
            items.push(
                <CarouselItem
                    key={i}
                    active={i === 0 ? "active" : ""}
                    list={packList.slice(i, i + 3)}
                    handleAction={handleAction}
                />
            );
        }
        return items;
    },
    registrationDataIsInvalid: (
        { firstName, lastName, email, phoneNumber, password },
        confirmPassword,
        setMessage
    ) => {
        let newMessage = "";
        if (firstName === "") {
            newMessage = "First name is mandatory";
        } else if (lastName === "") {
            newMessage = "Last name is mandatory";
        } else if (email === "") {
            newMessage = "Email is mandatory";
        } else if (phoneNumber === "") {
            newMessage = "Phone Number is mandatory";
        } else if (phoneNumber.length !== 10) {
            newMessage = "Phone Number must have 10 digits";
        } else if (password === "") {
            newMessage = "Password is mandatory";
        } else if (password !== confirmPassword) {
            newMessage = "Passwords do not match";
        } else {
            return false;
        }
        setMessage(newMessage);
        return true;
    },
};
export default Toolbox;
