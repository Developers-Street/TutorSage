import { FC, memo, useEffect, useState } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
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
import { dataExistCheck } from '../../APIs/auth';

const UserLazy = lazy(() => import("./Me/User.page"));

interface Props {
}

const AppContainer: FC<Props> = (props) => {

    const user = useAppSelector((state) => state.auth.byId[state.auth.id!]);
    const [showSidebar, setShowSidebar] = useState(true);
    const [userDataExist, setUserDataExist] = useState(true);

    /**********FOR NOW **********************************/

    useEffect(() => {
        async function callDataCheck() {
            try {
                const response = await dataExistCheck();
                setUserDataExist(true);
            } catch (err) {
                setUserDataExist(false);
            }
        }
        callDataCheck();
    })
    /**********FOR NOW **********************************/

    return (
        <div>
            {userDataExist ? <Navbar profileImg={user.profilePicUrl || ""} sidebarToggle={() => setShowSidebar(!showSidebar)}></Navbar>:<></>}
            <div className="flex flex-row">
                {userDataExist ? <Sidebar isVisible={showSidebar}></Sidebar>:<></>}
                <Switch>
                    <Route path='/dashboard'>
                        {userDataExist ? <DashboardPage /> : <Redirect to="/register" />}
                    </Route>
                    <Route path='/recordings'>
                        {userDataExist ? <RecordingsPage /> : <Redirect to="/register" />}
                    </Route>
                    <Route path='/groups' exact>
                        {userDataExist ? <GroupsPage /> : <Redirect to="/register" />}
                    </Route>
                    <Route path='/groups/:groupId' exact>
                        {userDataExist ? <GroupDetailsPage /> : <Redirect to="/register" />}
                    </Route>
                    <Route path="/users" exact>
                        {userDataExist ? <UsersPage /> : <Redirect to="/register" />}
                    </Route>
                    <Route path="/users/:userId" exact>
                        {userDataExist ? <UserDetailsPage /> : <Redirect to="/register" />}
                    </Route>

                    <Route path="/batch/:batchNumber/lecture/:lectureNumber">
                        {userDataExist ? <LecturePage /> : <Redirect to="/register" />}
                    </Route>
                    <Route path="/profile">
                        {userDataExist ? <UserLazy /> : <Redirect to="/register" />}
                    </Route>


                    <Route path="/register">
                        {userDataExist ? <Redirect to="/dashboard" /> :
                            <RegisterDetailsPage></RegisterDetailsPage>}
                    </Route>
                </Switch>
            </div>
        </div>
    );
};

AppContainer.defaultProps = {};

export default memo(AppContainer);