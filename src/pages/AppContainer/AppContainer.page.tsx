import { FC, memo, useEffect, useState } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import Sidebar from '../../components/Sidebar';
import DashboardPage from './Dashboard.page';
import RecordingsPage from './Recordings.page';
import LecturePage from './Lecture.page';
import Navbar from '../../components/Navbar';
import { lazy } from "react";
import { useAppSelector } from '../../store';
import UsersPage from './Users/Users.page';
import UserDetailsPage from './Users/UserDetails.page';
import RegisterDetailsPage from './Me/RegisterDetails.page';
import { dataExistCheck } from '../../APIs/auth';
import Spinner from '../../components/Spinner/Spinner';
import CreateClassPage from './Class/CreateClass.page';
import JoinClassPage from './Class/JoinClass.page';

const UserLazy = lazy(() => import("./Me/User.page"));

interface Props {
}

const AppContainer: FC<Props> = (props) => {

    const user = useAppSelector((state) => state.auth.byId[state.auth.id!]);
    const [showSidebar, setShowSidebar] = useState(true);
    const [userDataExist, setUserDataExist] = useState<number>(-1);

    /**********FOR NOW **********************************/

    useEffect(() => {
        async function callDataCheck() {
            try {
                const response = await dataExistCheck();
                setUserDataExist(1);
            } catch (err) {
                setUserDataExist(0);
            }
        }
        callDataCheck();
    })
    /**********FOR NOW **********************************/

    if(userDataExist === -1) return (<div><Spinner/></div>);

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
                    <Route path="/class/create" exact>
                        {userDataExist ? <CreateClassPage /> : <Redirect to="/register" />}
                    </Route>
                    <Route path="/class/join" exact>
                        {userDataExist ? <JoinClassPage /> : <Redirect to="/register" />}
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