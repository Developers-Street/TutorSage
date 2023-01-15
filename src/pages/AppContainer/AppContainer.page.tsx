import { FC, memo, useState } from 'react';
import { Route, Switch } from 'react-router-dom';
import Sidebar from '../../components/Sidebar';
import DashboardPage from './Dashboard.page';
import Navbar from '../../components/Navbar';
import { lazy } from "react";
import { useAppSelector } from '../../store';

const ClassLazy = lazy(() => import("./Class/Class.page"));
const MeLazy = lazy(() => import("./Me/Me.page"));
const UsersLazy = lazy(() => import("./Users/Users.page"));

interface Props { }

const AppContainer: FC<Props> = (props) => {

    const user = useAppSelector((state) => state.auth.byId[state.auth.id!]);

    const [showNavbarMenu, setShowNavbarMenu] = useState(false);

    return (
        <div className="flex flex-col h-screen" onClick={() => { setShowNavbarMenu(false) }}>
            <Navbar setShowNavbarMenu={setShowNavbarMenu} showNavbarMenu={showNavbarMenu} className="fixed overflow-auto h-10" profileImg={user.userData.profilePicUrl || ""}></Navbar>
            <div className="flex flex-row mt-10 appContainer-height">
                <Sidebar></Sidebar>
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
                    <Route path="/users">
                        <UsersLazy />
                    </Route>
                </Switch>
            </div>
        </div>
    );
};

AppContainer.defaultProps = {};

export default memo(AppContainer);