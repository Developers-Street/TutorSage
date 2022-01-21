import { FC, memo } from 'react';
import { Route, Switch } from 'react-router-dom';
import Profile from './Profile.page';
import EditProfile from "./EditProfile.page";

interface Props {
}

const Me: FC<Props> = (props) => {
    return (
        <Switch>
            <Route path='/me/profile' exact>
                <Profile></Profile>
            </Route>
            <Route path='/me/profile/edit' exact>
                <EditProfile></EditProfile>
            </Route>
        </Switch>
    );
};

Me.defaultProps = {};

export default memo(Me);