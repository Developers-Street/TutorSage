import { FC, memo, useState } from 'react';
import { Route, Switch } from 'react-router-dom';
import Sidebar from '../../components/Sidebar';
import DashboardPage from './Dashboard.page';
import Navbar from '../../components/Navbar';
import { lazy } from "react";
import { useAppSelector } from '../../store';
import LinkTo from '../../components/LinkTo';
import { logout } from '../../APIs/auth';
import { ImProfile } from 'react-icons/im';
import { FiLogOut } from 'react-icons/fi';

const CourseLazy = lazy(() => import("./Course/CourseRoutes.page"));
const MeLazy = lazy(() => import("./Me/Me.page"));
const UsersLazy = lazy(() => import("./Users/Users.page"));
const OrganizationLazy = lazy(() => import("./Organization/OrganizationRoutes.page"));

interface Props { }

const AppContainer: FC<Props> = (props) => {

    const user = useAppSelector((state) => state.auth.byId[state.auth.id!]);

    const [showNavbarMenu, setShowNavbarMenu] = useState(false);

    return (
        <div className="flex flex-col h-screen" onClick={() => { setShowNavbarMenu(false) }}>
            <Navbar setShowNavbarMenu={setShowNavbarMenu} showNavbarMenu={showNavbarMenu} className="fixed overflow-auto h-10" profileImg={user.userData.profilePicUrl || ""}></Navbar>
            {showNavbarMenu && <div className={`bg-white border p-1 absolute border-black right-5 top-10 z-50`}>
                <ul className='text-sm'>
                    <li className='p-1'><LinkTo to="/me/profile" className="flex flex-row items-center space-x-1 border-b border-black"><ImProfile></ImProfile><span>Profile</span></LinkTo></li>
                    <li className='p-1'><LinkTo to="" className='flex flex-row items-center space-x-1' type="icon" onClick={() => logout()}>
                        <FiLogOut></FiLogOut>
                        <span>Logout</span>
                    </LinkTo></li>
                </ul>
            </div>}
            <div className="flex flex-row mt-10 appContainer-height">
                <Sidebar></Sidebar>
                <div className='overflow-y-auto w-full'>
                    <Switch>
                        <Route path='/dashboard' exact>
                            <DashboardPage />
                        </Route>
                        <Route path="/me">
                            <MeLazy />
                        </Route>
                        <Route path="/organization">
                            <OrganizationLazy />
                        </Route>
                        <Route path="/course">
                            <CourseLazy />
                        </Route>
                        <Route path="/users">
                            <UsersLazy />
                        </Route>
                    </Switch>
                </div>
            </div>
        </div >
    );
};

AppContainer.defaultProps = {};

export default memo(AppContainer);