import { FC, memo, useState } from 'react';
import { Route, Switch } from 'react-router-dom';
import Sidebar from '../../components/Sidebar';
import DashboardPage from './Dashboard.page';
import RecordingsPage from './Recordings.page';
import LecturePage from './Lecture.page';
import Navbar from '../../components/Navbar';
import { lazy } from "react";
import { useAppSelector } from '../../store';
import UsersPage from './Users/Users.page';
import UserDetailsPage from './Users/UserDetails.page';
import CreateClassPage from './Class/CreateClass.page';
import JoinClassPage from './Class/JoinClass.page';

const UserLazy = lazy(() => import("./Me/User.page"));

interface Props {}

const AppContainer: FC<Props> = (props) => {

    const user = useAppSelector((state) => state.auth.byId[state.auth.id!]);
    const [showSidebar, setShowSidebar] = useState(true);

    return (
        <div>
            <Navbar profileImg={user.profilePicUrl || ""} sidebarToggle={() => setShowSidebar(!showSidebar)}></Navbar>:<></>
            <div className="flex flex-row">
                <Sidebar isVisible={showSidebar}></Sidebar>:<></>
                <Switch>
                    <Route path='/dashboard'>
                        <DashboardPage />
                    </Route>
                    <Route path='/recordings'>
                        <RecordingsPage />
                    </Route>
                    <Route path="/users" exact>
                        <UsersPage />
                    </Route>
                    <Route path="/users/:userId" exact>
                        <UserDetailsPage />
                    </Route>
                    <Route path="/batch/:batchNumber/lecture/:lectureNumber">
                        <LecturePage />
                    </Route>
                    <Route path="/profile">
                        <UserLazy />
                    </Route>
                    <Route path="/class/create" exact>
                        <CreateClassPage />
                    </Route>
                    <Route path="/class/join" exact>
                        <JoinClassPage />
                    </Route>
                </Switch>
            </div>
        </div>
    );
};

AppContainer.defaultProps = {};

export default memo(AppContainer);