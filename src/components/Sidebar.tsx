import { FC, memo, useState } from 'react';
import { FaUsers } from 'react-icons/fa';
import { ImMenu } from 'react-icons/im';
import { FiLogOut } from 'react-icons/fi';
import { MdSpaceDashboard } from 'react-icons/md';
import { SiGoogleclassroom } from 'react-icons/si';
import { logout } from '../APIs/auth';
import LinkTo from './LinkTo';

interface Props {
    className?: string;
}

const Sidebar: FC<Props> = ({ className }) => {

    const [opened, setOpened] = useState(false);

    return (
        <div className={`bg-gray-300 p-4 sidebar ${!opened ? "sidebar_closed" : ""}`}>
            <ImMenu onClick={() => setOpened(!opened)}></ImMenu>
            <div className='mt-4 flex flex-col space-y-3'>
                <LinkTo to="/dashboard" className='w-full flex space-x-2 items-center h-5'>
                    <MdSpaceDashboard className='text-xl'></MdSpaceDashboard>
                    <span className={`sidebar_button_name ${!opened ? "sidebar_button_name_hidden" : ""}`}>Dashboard</span>
                </LinkTo>
                <LinkTo to='/class' className='flex space-x-2 items-center'>
                    <SiGoogleclassroom className='text-xl'></SiGoogleclassroom>
                    <span className={`sidebar_button_name ${!opened ? "sidebar_button_name_hidden" : ""}`}>Classes</span>
                </LinkTo>
                <LinkTo to='/users' className='flex space-x-2 items-center'>
                    <FaUsers className='text-xl'></FaUsers>
                    <span className={`sidebar_button_name ${!opened ? "sidebar_button_name_hidden" : ""}`}>Users</span>
                </LinkTo>
                <span className='flex space-x-2 items-center' onClick={() => logout()}>
                    <FiLogOut className='text-xl'></FiLogOut>
                    <span className={`sidebar_button_name ${!opened ? "sidebar_button_name_hidden" : ""}`}>Logout</span>
                </span>
            </div>
        </div >
    );
};

Sidebar.defaultProps = {};

export default memo(Sidebar);