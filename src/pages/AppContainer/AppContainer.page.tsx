import { FC, memo, useState } from 'react';
import { Route, Switch } from 'react-router-dom';
import Sidebar from '../../components/Sidebar';
import DashboardPage from './Dashboard.page';
import Navbar from '../../components/Navbar';
import { lazy } from "react";
import { useAppSelector } from '../../store';
import UsersPage from './Users/Users.page';
import UserDetailsPage from './Users/UserDetails.page';

const ClassLazy = lazy(() => import("./Class/Class.page"));
const MeLazy = lazy(() => import("./Me/Me.page"));

interface Props { }

const AppContainer: FC<Props> = (props) => {

    const user = useAppSelector((state) => state.auth.byId[state.auth.id!]);

    const [showSidebar, setShowSidebar] = useState(false);
    const [showNavbarMenu, setShowNavbarMenu] = useState(false);

    return (
        <div className="flex flex-col h-screen"  onClick={() => {setShowSidebar(false); setShowNavbarMenu(false)}}>
            <Navbar setShowNavbarMenu={setShowNavbarMenu} showNavbarMenu={showNavbarMenu} className="fixed overflow-auto h-16" profileImg={user.profilePicUrl || ""}></Navbar>
            <div className="flex flex-row bg-green-700 w-full mt-16">
                {!showSidebar && <span className={`p-3 border-2 top-1/2 border-black font-black opacity-50 text-2xl rounded-r-full fixed overflow-auto`} onClick={(e) => {e.stopPropagation();setShowSidebar(!showSidebar);}}>&gt;</span>}
                {showSidebar && <Sidebar className={`appContainer-height bottom-0 fixed overflow-auto`}></Sidebar>}
                <Switch>
                    <Route path='/dashboard' exact>
                        <DashboardPage />
                    </Route>
                    <Route path="/me">
                        <MeLazy />
                    </Route>
                    <Route path="/class">
                        <ClassLazy />
                    </Route>

                    <Route path="/users" exact>
                        <UsersPage />
                    </Route>
                    <Route path="/users/:userId" exact>
                        <UserDetailsPage />
                    </Route>
                </Switch>
            </div>
        </div>
    );
};

AppContainer.defaultProps = {};

export default memo(AppContainer);