import { FC, memo } from 'react';
import { Route, Switch } from 'react-router-dom';
import ClassDetailsPage from './ClassDetails.page';
import CreateClassPage from './CreateClass.page';
import JoinClassPage from './JoinClass.page';
import SearchClassesPage from './SearchClasses.page';

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
            <Route path="/class" exact>
                <SearchClassesPage />
            </Route>
            <Route path="/class/:id" exact>
                <ClassDetailsPage />
            </Route>
        </Switch>
    );
};

Class.defaultProps = {};

export default memo(Class);