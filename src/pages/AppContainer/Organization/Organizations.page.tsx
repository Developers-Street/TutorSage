import { FC, memo, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { myOrganizationsQueryAction } from '../../../actions/myOrganization.actions';
import { pathActions } from '../../../actions/path.actions';
import LinkTo from '../../../components/LinkTo';
import { Organization as OrganizationInterface } from '../../../Models/Organization';
import { myOrganizationsFetchSelector, myOrganizationsLoadingListErrorSelector, myOrganizationsLoadingListSelector } from '../../../selectors/organization.selectors';
import Spinner from '../../../sharedComponents/Spinner';
import { useAppSelector } from '../../../store';

interface Props { }

const Organization: FC<Props> = (props) => {

    useEffect(() => { pathActions.setPath(window.location.pathname.split("/").splice(1)); })

    const dispatch = useDispatch();

    const myOrganizations = useAppSelector(myOrganizationsFetchSelector);
    const loading = useAppSelector(myOrganizationsLoadingListSelector);
    const error = useAppSelector(myOrganizationsLoadingListErrorSelector);

    useEffect(() => {
        dispatch(myOrganizationsQueryAction());
    }, []) //eslint-disable-line

    return (
        <div>
            <div>
                <div className='flex flex-row justify-between items-center'>
                    <span className='flex flex-row space-x-1'>
                        <h2 className='text-md font-bold'>My Organizations</h2>
                        {loading && <Spinner type="button" />}
                    </span>
                    {<LinkTo to='/organization/create'>Create Organization</LinkTo>}
                </div>
                <div>
                    {error}
                    {myOrganizations.map((o: OrganizationInterface, index: number) => {
                        return <div key={index}>
                            {o.name}
                            {o.email}
                        </div>
                    })}
                </div>
            </div>
            <div>
                <LinkTo to='/organization/search'>Search Organization</LinkTo>
            </div>
        </div>
    );
};

Organization.defaultProps = {};

export default memo(Organization);