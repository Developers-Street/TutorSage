import { FC, memo, useEffect } from "react";
import { useDispatch } from "react-redux";
import { pathActions } from "../../../actions/path.actions";
import Spinner from "../../../sharedComponents/Spinner";
import { useAppSelector } from "../../../store";
import EditInput from "../../../sharedComponents/EditInput";
import { organizationsFetchSelector, organizationsLoadingListErrorSelector, organizationsLoadingListSelector, organizationsQuerySelector } from "../../../selectors/organization.selectors";
import { Organization } from "../../../Models/Organization";
import { organizationsQueryAction } from "../../../actions/organization.actions";
import OrganizationCard from "../../../components/OrganizationCard";

interface Props { }

const SearchOrganizations: FC<Props> = (props) => {

    useEffect(() => { pathActions.setPath(window.location.pathname.split("/").splice(1)); })

    const dispatch = useDispatch();

    const organizations: Organization[] = useAppSelector(organizationsFetchSelector);
    const loading = useAppSelector(organizationsLoadingListSelector);
    const query = useAppSelector(organizationsQuerySelector);
    const error = useAppSelector(organizationsLoadingListErrorSelector);

    return (
        <div>
            {loading && <Spinner type="button" />}
            <EditInput value={query} onChange={(e) => {
                dispatch(organizationsQueryAction((e.target as HTMLInputElement).value))
            }
            }></EditInput>
            <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-3">
                {!error && organizations.map((o: Organization, index: number) => {
                    return (
                        <OrganizationCard  key={index} oId={o.id} name={o.name} email={o.email} imgSrc={o.logoUrl} admin={o.admin.username} creator={o.creator.username}></OrganizationCard>
                    );
                })}
            </div>
            <div>{error}</div>
        </div>
    );
};

SearchOrganizations.defaultProps = {};

export default memo(SearchOrganizations);