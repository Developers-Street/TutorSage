import { FC, memo, useEffect } from "react";
import { useDispatch } from "react-redux";
import { pathActions } from "../../../actions/path.actions";
import LinkTo from "../../../components/LinkTo";
import Spinner from "../../../sharedComponents/Spinner";
import { useAppSelector } from "../../../store";
import EditInput from "../../../sharedComponents/EditInput";
import UserData from "../../../components/UserData";
import { organizationsFetchSelector, organizationsLoadingListErrorSelector, organizationsLoadingListSelector, organizationsQuerySelector } from "../../../selectors/organization.selectors";
import { Organization } from "../../../Models/Organization";
import { organizationsQueryAction } from "../../../actions/organization.actions";

interface Props { }

const SearchOrganizations: FC<Props> = (props) => {

    useEffect(() => { pathActions.setPath(window.location.pathname.split("/").splice(1)); })

    const dispatch = useDispatch();

    const organizations = useAppSelector(organizationsFetchSelector);
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
            {!error && organizations.map((o: Organization, index: number) => {
                return (<div key={o.id}>
                    <LinkTo to={`/organization/${o.id}`}>
                        <UserData
                            className={`${(index % 2 === 0) ? "bg-white" : "bg-gray-100"}`}
                            name={o.name}
                            // desc={class.bio}
                            imgSrc={""}
                        ></UserData>
                    </LinkTo>
                </div>);
            })}
            <div>{error}</div>
        </div>
    );
};

SearchOrganizations.defaultProps = {};

export default memo(SearchOrganizations);