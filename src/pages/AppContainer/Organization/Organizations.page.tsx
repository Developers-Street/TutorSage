import { FC, memo, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { myOrganizationsQueryAction } from '../../../actions/myOrganization.actions';
import { pathActions } from '../../../actions/path.actions';
import LinkTo from '../../../components/LinkTo';
import OrganizationCard from '../../../components/OrganizationCard';
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
                {error}
                <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-3'>
                    {myOrganizations.map((o: OrganizationInterface, index: number) => {
                        return <OrganizationCard key={index} oId={o.id} name={o.name} email={o.email} imgSrc={o.logoUrl} admin={o.admin.username} creator={o.creator.username}></OrganizationCard>
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