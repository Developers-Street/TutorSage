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
    const [showSidebar, setShowSidebar] = useState(true);

    return (
        <div>
            <Navbar profileImg={user.profilePicUrl || ""} sidebarToggle={() => setShowSidebar(!showSidebar)}></Navbar>:<></>
            <div className="flex flex-row">
                <Sidebar isVisible={showSidebar}></Sidebar>:<></>
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