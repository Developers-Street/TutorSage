import { FC, memo } from 'react';
import { Route, Switch } from 'react-router-dom';
import CourseDetailsPage from '../Course/CourseDetails.page';
import CreateCoursePage from '../Course/CreateCourse.page';
import ManageStudentsPage from '../Course/ManageStudents.page';
import CreateOrganizationPage from './CreateOrganization.page';
import OrganizationDetailsPage from './OrganizationDetails.page';
import OrganizationsPage from './Organizations.page';
import SearchOrganizationPage from './SearchOrganization.page';

interface Props {
}

const OrganizationRoutes: FC<Props> = (props) => {
    return (
        <div className='py-3 px-4'>
            <Switch>
                <Route path="/organization" exact>
                    <OrganizationsPage></OrganizationsPage>
                </Route>
                <Route path="/organization/create" exact>
                    <CreateOrganizationPage />
                </Route>
                <Route path="/organization/search" exact>
                    <SearchOrganizationPage />
                </Route>
                <Route path="/organization/:id" exact>
                    <OrganizationDetailsPage />
                </Route>
                <Route path="/organization/:oId/course/create" exact>
                    <CreateCoursePage></CreateCoursePage>
                </Route>
                <Route path="/organization/:oId/course/:cId" exact>
                    <CourseDetailsPage></CourseDetailsPage>
                </Route>
                <Route path="/organization/:oId/course/:cId/students/manage" exact>
                    <ManageStudentsPage />
                </Route>
            </Switch>
        </div>
    );
};

OrganizationRoutes.defaultProps = {};

export default memo(OrganizationRoutes);