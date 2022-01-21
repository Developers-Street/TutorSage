import { FC, memo } from 'react';
import { Route, Switch } from 'react-router-dom';
import CreateClassPage from './CreateClass.page';
import JoinClassPage from './JoinClass.page';

interface Props {
}

const Class: FC<Props> = (props) => {
    return (
        <Switch>
            <Route path="/class/create" exact>
                <CreateClassPage />
            </Route>
            <Route path="/class/join" exact>
                <JoinClassPage />
            </Route>
        </Switch>
    );
};

Class.defaultProps = {};

export default memo(Class);