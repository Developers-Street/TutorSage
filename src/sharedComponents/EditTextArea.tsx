import React from 'react';
import { FC, memo, useState } from 'react';

interface Props extends React.HTMLProps<HTMLTextAreaElement> {
    className?: string;
    touched?: boolean;
    errorMessage?: string;
    label?: string;
}

const EditTextArea: FC<Props> = ({
    className,
    errorMessage,
    touched,
    label,
    ...rest
}) => {
    const [isSelected, setIsSelected] = useState(false);
    return (
        <div className={`${className}`}>
            <label htmlFor={rest.name} className="w-full">
                <span className={`text-xs text-gray-500`} >{label}</span>
                <textarea
                    {...rest}
                    onFocus={() => {
                        setIsSelected(true);
                    }}
                    onBlur={() => {
                        setIsSelected(false);
                    }}
                    name={rest.name}
                    placeholder={rest.placeholder}
                    className={`outline-none w-full px-2.5 flex border rounded-md h-10 ${(isSelected) ? "border-primary-medium shadow-primary" : "border-gray-400"}`}
                ></textarea>
            </label>
            {touched && (
                <div className="flex text-red-800">
                    {errorMessage}
                </div>
            )}
        </div>
    );
};

EditTextArea.defaultProps = {};

export default memo(EditTextArea);