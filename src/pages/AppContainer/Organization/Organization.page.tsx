import { FC, memo } from 'react';
import { Route, Switch } from 'react-router-dom';
import LinkTo from '../../../components/LinkTo';
import CreateOrganizationPage from './CreateOrganization.page';
import OrganizationDetailsPage from './OrganizationDetails.page';
import SearchOrganizationPage from './SearchOrganization.page';

interface Props {
}

const Organization: FC<Props> = (props) => {
    return (
        <div>
            <LinkTo to='/organization/create'>Create Organization</LinkTo>
            <Switch>
                <Route path="/organization/create" exact>
                    <CreateOrganizationPage />
                </Route>
                <Route path="/organization" exact>
                    <SearchOrganizationPage />
                </Route>
                <Route path="/organization/:id" exact>
                    <OrganizationDetailsPage />
                </Route>
            </Switch>
        </div>
    );
};

Organization.defaultProps = {};

export default memo(Organization);