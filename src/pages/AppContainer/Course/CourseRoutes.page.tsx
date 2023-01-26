import { FC, memo } from 'react';
import { Route, Switch } from 'react-router-dom';
import CourseDetailsPage from './CourseDetails.page';
import CreateCoursePage from './CreateCourse.page';
import JoinCoursePage from './JoinCourse.page';
import SearchCoursesPage from './SearchCourses.page';

interface Props {
}

const Class: FC<Props> = (props) => {
    return (
        <Switch>
            <Route path="/course/create" exact>
                <CreateCoursePage />
            </Route>
            <Route path="/course/join" exact>
                <JoinCoursePage />
            </Route>
            <Route path="/course" exact>
                <SearchCoursesPage />
            </Route>
            <Route path="/course/:cId" exact>
                <CourseDetailsPage />
            </Route>
        </Switch>
    );
};

Class.defaultProps = {};

export default memo(Class);