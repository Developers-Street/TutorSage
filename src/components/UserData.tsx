import { FC, memo } from 'react';
import Avatar from '../sharedComponents/Avatar';

interface Props {
    name: string;
    imgSrc: string | null;
    desc?: string;
    className?: string;
}

const UserData: FC<Props> = ({
    name,
    imgSrc,
    desc,
    className
}) => {
    return (
        <div className={`flex flex-row p-4 space-x-10 ${className}`}>
            <Avatar avatarSize="lg" missingImageLetter={name[0]} showStatus={false} imgSrc={imgSrc}></Avatar>
            <div className="flex flex-col">
                <h1 className="font-bold text-lg capitalize">{name}</h1>
                <p>{desc}</p>
            </div>
        </div>
    );
};

UserData.defaultProps = {};

export default memo(UserData);