import { FC, memo } from 'react';
import Avatar from '../sharedComponents/Avatar';
import LinkTo from './LinkTo';

interface Props {
    name: string;
    oId: number;
    cId: number;
    headTutor: string;
    className?: string;
}

const UserCard: FC<Props> = ({
    name,
    className,
    oId,
    cId,
    headTutor
}) => {

    return (
        <div className={`${className}`}>
            <div className='bg-gray-200 p-4 rounded-lg max-w-sm w-full flex flex-col'>
                <h3 className='text-base font-bold self-center'>{name}</h3>
                <span className='mt-4 flex flex-row justify-between text-xs'>
                    <span className='font-semibold'>Head Tutor:</span>
                    <span>{headTutor}</span>
                </span>
                <LinkTo to={`/organization/${oId}/course/${cId}`} className="text-xs">View</LinkTo>
            </div>
        </div>
    );
};

UserCard.defaultProps = {};

export default memo(UserCard);