import { FC, memo } from 'react';
import { Route, Switch } from 'react-router-dom';
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
            </Switch>
        </div>
    );
};

OrganizationRoutes.defaultProps = {};

export default memo(OrganizationRoutes);