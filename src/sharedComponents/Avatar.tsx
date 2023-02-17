import React, { ReactChild } from "react";

interface Props extends React.ImgHTMLAttributes<HTMLImageElement> {
    avatarSize?: "xl" | "lg" | "md" | "sm" | "xs";
    showStatus?: boolean;
    onlineStatus?: boolean;
    imgSrc: string | null |undefined;
    missingImageLetter: string;
    shape?: "circular" | "square";
    imgClass?: string;
    children?: ReactChild;
}

const Avatar: React.FC<Props> = ({
    avatarSize,
    showStatus,
    onlineStatus,
    imgSrc,
    missingImageLetter,
    shape,
    className,
    imgClass,
    children
}) => {

    const avatarClass = {
        xl: " h-28 w-28 min-w-28 ",
        lg: " h-20 w-20 min-w-20 ",
        md: " h-14 w-14 min-w-14 ",
        sm: " h-10 w-10 min-w-10 ",
        xs: " h-7 w-7 min-w-7 "
    }

    const textClass = {
        xl: " font-bold text-7xl ",
        lg: " font-semibold text-5xl ",
        md: " font-semibold text-3xl ",
        sm: " font-semibold text-xl ",
        xs: " font-semibold "
    }

    const statusClass = {
        circular: {
            xl: " h-6 w-6 border-4 left-3/4 bottom-1/3 ",
            lg: " h-5 w-5 border-3 left-3/4 bottom-1/3 ",
            md: " h-4 w-4 border-3 left-3/4 bottom-1/3 ",
            sm: " h-3 w-3 border-2 left-3/4 bottom-1/3 ",
            xs: " h-2 w-2 border left-3/4 bottom-1/3 "
        },
        square: {
            xl: " h-6 w-6 border-4 left-22 bottom-6 ",
            lg: " h-5 w-5 border-3 left-3/4 bottom-1/4 ",
            md: " h-4 w-4 border-3 left-3/4 bottom-1/4 ",
            sm: " h-3 w-3 border-2 left-3/4 bottom-1/4 ",
            xs: " h-2 w-2 border left-3/4 bottom-2 "
        }
    }

    return (
        <div className={`${avatarClass[avatarSize!]} ${(shape === "circular") ? "rounded-full" : "rounded-lg"} ${className}`}>
            {imgSrc ? <img
                src={(imgSrc ? imgSrc : "")}
                onError={(event: any) => { event.target.src = "https://designreset.com/cork/ltr/demo4/assets/img/profile-3.jpeg"; }}
                alt="avatar"
                className={` ${avatarClass[avatarSize!]} ${(shape === "circular") ? "rounded-full" : "rounded-lg"} ${imgClass}`}
            /> : <div className="cursor-default select-none bg-red-200 rounded-full h-full flex flex-row items-center justify-around"><span className={`${textClass[avatarSize!]}`}>{missingImageLetter.toUpperCase()}</span></div>}
            {children}
            <div
                className={`${(showStatus ? 'block' : 'hidden')} rounded-full ${(onlineStatus ? 'bg-green-400' : 'bg-gray-800')} ${statusClass[shape!][avatarSize!]} relative  border-white`}
            ></div>
        </div>
    );
};

Avatar.defaultProps = {
    shape: "circular",
    avatarSize: "sm",
    showStatus: true,
    onlineStatus: false,
};

export default React.memo(Avatar);