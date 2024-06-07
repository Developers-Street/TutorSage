import { FC, memo } from 'react';
import Avatar from '../sharedComponents/Avatar';
import LinkTo from './LinkTo';

interface Props {
    name: string;
    email: string;
    admin: string;
    creator: string;
    imgSrc: string | null;
    oId: number;
    className?: string;
}

const OrganizationCard: FC<Props> = ({
    name,
    email,
    admin,
    creator,
    imgSrc,
    className,
    oId
}) => {
    return (
        <div className={`${className}`}>
            <div className='bg-gray-200 flex flex-col items-center rounded-lg p-3'>
                <Avatar avatarSize='lg' missingImageLetter={name[0]} showStatus={false} imgSrc={imgSrc}></Avatar>
                <div className='flex flex-col mt-5 w-full'>
                    <h2 className='text-lg font-extrabold self-center'>{name}</h2>
                    <span className='text-xs self-center'>{email}</span>
                    <div className='mt-6 flex flex-row justify-between text-sm'>
                        <span className='font-bold'>Administrator:</span>
                        <span>{admin}</span>
                    </div>
                    <div className='flex flex-row justify-between text-sm'>
                        <span className='font-bold'>Creator:</span>
                        <span>{creator}</span>
                    </div>
                </div>
                <div>
                    <LinkTo to={`/organization/${oId}`}>View</LinkTo>
                </div>
            </div>
        </div>
    );
};

OrganizationCard.defaultProps = {};

export default memo(OrganizationCard);