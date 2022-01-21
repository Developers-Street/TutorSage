import React from "react";
import Icon from "../Icons/Icons";

interface Props {
    children: React.ReactElement;
    theme: "primary" | "success" | "secondary" | "danger" | "custom";
    customAlertClass?: string;
    customButtonClass?: string;
}

const Alert: React.FC<Props> = ({
    children,
    theme,
    customAlertClass,
    customButtonClass
}) => {
    const [isVisible, setIsVisible] = React.useState(true);

    const alertClass = {
        primary: " bg-primary-light text-primary-dark ",
        success: " bg-green-200 text-green-800 ",
        secondary: " bg-yellow-100 text-yellow-700 ",
        danger: " bg-red-300 text-red-800 ",
        custom: customAlertClass
    };

    const buttonClass = {
        primary: "hover:text-blue-700",
        success: " hover:text-green-400",
        secondary: " hover:text-yellow-300",
        danger: " hover:text-red-500",
        custom: customButtonClass
    };

    return (
        <div className={(isVisible ? " block" : " hidden")}>
            <div className={`flex flex-row justify-between rounded-md w-full py-4 px-4 ${alertClass[theme]}`} >
                <div>{children}</div>
                <button onClick={() => setIsVisible(false)} className={`${buttonClass[theme]}`}>
                    <Icon theme={theme !== "custom" ? theme : "primary"} name="cross" />
                </button>
            </div>
        </div>
    );
};

Alert.defaultProps = {
};

export default React.memo(Alert);