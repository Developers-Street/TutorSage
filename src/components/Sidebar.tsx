import { FC, memo } from 'react';
import { logout } from '../APIs/auth';
import SidebarButton from './SidebarButton';

interface Props {
    className?: string;
}

const Sidebar: FC<Props> = ({ className }) => {

    return (
        <div className={`bg-gray-100 p-5 w-72 ${className}`}>
            <ul className={`space-y-3.5`} >
                <SidebarButton name="dashboard" iconName="dashboard" link="/dashboard" />
                <SidebarButton name="users" iconName="user" link="/users" />
                <SidebarButton name="logout" iconName="logout" link="" onClick={() => {
                    logout();
                    window.location.href = "/login";
                }} />
            </ul>
        </div >
    );
};

Sidebar.defaultProps = {};

export default memo(Sidebar);