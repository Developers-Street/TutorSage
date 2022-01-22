import { Dispatch, SetStateAction, useState } from 'react';
import { FC, memo } from 'react';
import { logout } from '../APIs/auth';
import Avatar from '../sharedComponents/Avatar/Avatar';
import LinkTo from '../components/LinkTo';
import Icons from '../sharedComponents/Icons/Icons';

interface Props {
    profileImg: string;
    className: string;
    showNavbarMenu: boolean;
    setShowNavbarMenu: Dispatch<SetStateAction<boolean>>;
}

const Navbar: FC<Props> = ({ profileImg, className, showNavbarMenu, setShowNavbarMenu }) => {

    return (
        <div onClick={() => {setShowNavbarMenu(false)}} className={`flex flex-row w-full top-0 justify-between px-5 py-2 bg-gray-900 items-center ${className}`}>
            <div className={`flex flex-row items-center space-x-3.5`}>
                <Icons theme="primary" name="logo" />
                <h1 className="text-white text-xl font-semibold">TUTORSAGE</h1>
            </div>
            <div onClick={(e) => { setShowNavbarMenu(!showNavbarMenu); e.stopPropagation(); }}>
                <Avatar imgSrc={profileImg} shape="square" showStatus={false} avatarSize="xs" ></Avatar>
                {showNavbarMenu && <div className={`bg-white border border-black  right-5`}>
                    <ul>
                        <li><LinkTo to="/profile" className="border-b border-black">Profile</LinkTo></li>
                        <li><LinkTo to="" type="icon" onClick={() => {
                            logout();
                            window.location.href = "/login";
                        }}>
                            Logout
                        </LinkTo></li>
                    </ul>
                </div>}
            </div>
        </div>
    );
};

Navbar.defaultProps = {};

export default memo(Navbar);