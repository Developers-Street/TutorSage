import { FC, memo, useState } from 'react';
import { Route, Switch } from 'react-router-dom';
import Sidebar from '../../components/Sidebar';
import DashboardPage from './Dashboard.page';
import RecordingsPage from './Recordings.page';
import GroupsPage from './Groups/Groups.page';
import LecturePage from './Lecture.page';
import Navbar from '../../components/Navbar';
import { lazy } from "react";
import { useAppSelector } from '../../store';
import GroupDetailsPage from './Groups/GroupDetails.page';
import UsersPage from './Users/Users.page';
import UserDetailsPage from './Users/UserDetails.page';
import RegisterDetailsPage from './Me/RegisterDetails.page';

const UserLazy = lazy(() => import("./Me/User.page"));

interface Props {
}

const AppContainer: FC<Props> = (props) => {

    const user = useAppSelector((state) => state.auth.byId[state.auth.id!]);
    const [showSidebar, setShowSidebar] = useState(true);

    return (
        <div>
            <Navbar profileImg={user.profilePicUrl || ""} sidebarToggle={() => setShowSidebar(!showSidebar)}></Navbar>
            <div className="flex flex-row">
                <Sidebar isVisible={showSidebar}></Sidebar>
                <Switch>
                    <Route path='/dashboard'>
                        <DashboardPage></DashboardPage>
                    </Route>
                    <Route path='/recordings'>
                        <RecordingsPage></RecordingsPage>
                    </Route>
                    <Route path='/groups' exact>
                        <GroupsPage></GroupsPage>
                    </Route>
                    <Route path='/groups/:groupId' exact>
                        <GroupDetailsPage></GroupDetailsPage>
                    </Route>
                    <Route path="/users" exact>
                        <UsersPage></UsersPage>
                    </Route>
                    <Route path="/users/:userId" exact>
                        <UserDetailsPage></UserDetailsPage>
                    </Route>

                    <Route path="/batch/:batchNumber/lecture/:lectureNumber">
                        <LecturePage></LecturePage>
                    </Route>
                    <Route path="/profile">
                        <UserLazy></UserLazy>
                    </Route>
                    <Route path="/register">
                        <RegisterDetailsPage></RegisterDetailsPage>
                    </Route>
                </Switch>
            </div>
        </div>
    );
};

AppContainer.defaultProps = {};

export default memo(AppContainer);