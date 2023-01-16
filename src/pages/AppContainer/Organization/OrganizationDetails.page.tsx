import { useEffect } from "react";
import { FC, memo } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import Avatar from "../../../sharedComponents/Avatar";
import LinkTo from "../../../components/LinkTo";
import Spinner from "../../../sharedComponents/Spinner";
import { useAppSelector } from "../../../store";
import { organizationLoadingOneErrorSelector, organizationLoadingOneSelector, selectedorganizationSelector } from "../../../selectors/organization.selectors";
import { organizationQueryOneAction } from "../../../actions/organization.actions";

interface Props { }

const OrganizationDetails: FC<Props> = (props) => {

    const organizationId = +useParams<{ id: string }>().id;

    const o = useAppSelector(selectedorganizationSelector);
    const loading = useAppSelector(organizationLoadingOneSelector);
    const error = useAppSelector(organizationLoadingOneErrorSelector);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(organizationQueryOneAction(organizationId));
    }, [organizationId]); //eslint-disable-line react-hooks/exhaustive-deps

    if (!o && !loading) {
        return <div>
            {error}
            <LinkTo to={`/organization/${organizationId + 1}`}>Next organization</LinkTo>
        </div>
    }

    return (
        <div className="mx-auto flex flex-col space-y-10 items-center appContainer_min_height">
            {loading && <Spinner type="button" />}
            {o && <div>{o.name}
                <Avatar imgSrc={""}></Avatar></div>}
            {/* {user && user.roles && user.roles[0].name !== "ROLE_TUTOR" && <Button text="Join Organization" onClick={() => { dispatch(joinOrganizationAction({ organizationId })) }}></Button>} */}
            {/* {o && o.members[0] && o.members[0].username} */}
            <LinkTo to={`/organization/${organizationId + 1}`}>Next Organizations</LinkTo>
        </div>
    );
};

OrganizationDetails.defaultProps = {};

export default memo(OrganizationDetails);