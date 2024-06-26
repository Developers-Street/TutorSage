import { Dispatch, SetStateAction } from 'react';
import { FC, memo } from 'react';
import { meSelector } from '../selectors/auth.selectors';
import Avatar from '../sharedComponents/Avatar';
import Icons from '../sharedComponents/Icons';
import { useAppSelector } from '../store';

interface Props {
    profileImg: string;
    className: string;
    showNavbarMenu: boolean;
    setShowNavbarMenu: Dispatch<SetStateAction<boolean>>;
}

const Navbar: FC<Props> = ({ profileImg, className, showNavbarMenu, setShowNavbarMenu }) => {

    const user = useAppSelector(meSelector);

    return (
        <div onClick={() => { setShowNavbarMenu(false) }} className={`flex flex-row w-full top-0 justify-between px-5 bg-gray-900 items-center ${className}`}>
            <div className={`flex flex-row items-center space-x-2`}>
                <Icons theme="primary" name="logo" />
                <h1 className="text-white text-base font-semibold">TUTORSAGE</h1>
            </div>
            <span onClick={(e) => { setShowNavbarMenu(!showNavbarMenu); e.stopPropagation(); }}>
                <Avatar missingImageLetter={user.username[0]} imgSrc={profileImg} shape="square" showStatus={false} avatarSize="xs" ></Avatar>
            </span>
        </div>
    );
};

Navbar.defaultProps = {};

export default memo(Navbar);