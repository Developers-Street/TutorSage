import { FC, memo } from 'react';
import Avatar from '../sharedComponents/Avatar';

interface Props {
    name: string;
    imgSrc: string | null | undefined;
    uId: number;
    position: string;
    className?: string;
}

const UserCard: FC<Props> = ({
    name,
    imgSrc,
    className,
    uId,
    position
}) => {

    const getRole = (role: string): string => {
        switch(role) {
            case "ROLE_TUTOR": return "Tutor";
            case "ROLE_ORGANIZATION_ADMIN": return "Organization Admin";
            case "ROLE_STUDENT": return "Student";
        }
        return "";
    }

    return (
        <div className={`${className}`}>
            <div className='bg-gray-200 p-4 rounded-lg max-w-sm w-full flex flex-row space-x-4'>
                <Avatar avatarSize='md' missingImageLetter={name[0]} imgSrc={imgSrc} showStatus={false}></Avatar>
                <div className='flex flex-col -space-y-1'>
                    <h3 className='text-lg'>{name}</h3>
                    <span className='text-xs'>{getRole(position)}</span>
                </div>
            </div>
        </div>
    );
};

UserCard.defaultProps = {};

export default memo(UserCard);