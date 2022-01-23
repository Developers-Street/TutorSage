import { FC, memo } from 'react';
import { Route, Switch } from 'react-router-dom';
import SearchUsersPage from './SearchUsers.page';
import UserDetailsPage from './UserDetails.page';

interface Props {
}

const Users: FC<Props> = (props) => {
    return (
        <Switch>
            <Route path='/users' exact>
                <SearchUsersPage />
            </Route>
            <Route path='/users/:id' exact>
                <UserDetailsPage />
            </Route>
        </Switch>
    );
};

Users.defaultProps = {};

export default memo(Users);