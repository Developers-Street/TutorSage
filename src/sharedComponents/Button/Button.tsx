import React from "react";
import Spinner from "../Spinner/Spinner";

interface Props extends React.HTMLProps<HTMLButtonElement> {
    buttonDisabled?: boolean;
    className?: string;
    buttonSize?: "lg" | "md" | "sm";
    theme?: "primary" | "secondary" | "success" | "danger";
    buttonStyle?: "solid" | "outline";
    text: string;
}

const Button: React.FC<Props> = ({
    buttonDisabled,
    className,
    text,
    buttonSize,
    theme,
    buttonStyle,
    ...rest
}) => {

    const sizeClasses = {
        lg: " text-xl h-20 ",
        md: " text-lg h-14 ",
        sm: "h-9"
    }

    const themeClasses = {
        solid: {
            success: (buttonDisabled ? "bg-success-dark cursor-not-allowed" : "bg-success-light shadow-success hover:shadow-none") + " text-white ",
            danger: (buttonDisabled ? "bg-danger-dark cursor-not-allowed" : "bg-danger-light shadow-danger hover:shadow-none") + " text-white ",
            primary: (buttonDisabled ? "bg-primary-extra-dark cursor-not-allowed" : "bg-primary-medium shadow-primary hover:shadow-none") + " text-white ",
            secondary: (buttonDisabled ? "bg-secondary-extra-dark cursor-not-allowed" : "bg-secondary-medium shadow-secondary hover:shadow-none") + " text-white"
        },
        outline: {
            success: (buttonDisabled ? "border-2 border-success-dark text-success-dark cursor-not-allowed" : "border-2 border-success-light hover:bg-success-light text-success-light hover:text-white hover:shadow-success"),
            danger: (buttonDisabled ? "border-2 border-danger-dark text-danger-dark cursor-not-allowed" : "border-2 border-danger-light hover:bg-danger-light text-danger-light hover:text-white hover:shadow-danger"),
            primary: (buttonDisabled ? "border-2 bg-primary-extra-dark text-primary-extra-dark cursor-not-allowed" : "border-2 border-primary-medium hover:bg-primary-medium text-primary-medium hover:text-white hover:shadow-primary"),
            secondary: (buttonDisabled) ? "border-2 bg-secondary-extra-dark text-secondary-extra-dark cursor-not-allowed" : "border-2 border-secondary-medium hover:bg-secondary-medium text-secondary-medium hover:text-white hover:shadow-secondary"
        }
    }

    return (
        <div>
            <button
                {...rest}
                disabled={buttonDisabled}
                type="submit"
                className={`rounded-4px w-full flex items-center justify-center ${sizeClasses[buttonSize!]} ${themeClasses[buttonStyle!][theme!]} ${className}`}
            >
                {(buttonDisabled ? <Spinner type="button" classname="text-white" /> : text)}
            </button>
        </div>
    );
};

Button.defaultProps = {
    buttonDisabled: false,
    buttonSize: "sm",
    buttonStyle: "solid",
    theme: "primary"
};

export default React.memo(Button);