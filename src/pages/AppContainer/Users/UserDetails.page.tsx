import { useEffect } from "react";
import { FC, memo } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { userQueryOneAction } from "../../../actions/users.actions";
import Avatar from "../../../sharedComponents/Avatar";
import LinkTo from "../../../components/LinkTo";
import Spinner from "../../../sharedComponents/Spinner";
import { selectedUserSelector, userLoadingOneErrorSelector, userLoadingOneSelector } from "../../../selectors/users.selectors";
import { useAppSelector } from "../../../store";

interface Props { }

const UserDetails: FC<Props> = (props) => {

    const userId = +useParams<{ id: string }>().id;

    const user = useAppSelector(selectedUserSelector);
    const loading = useAppSelector(userLoadingOneSelector);
    const error = useAppSelector(userLoadingOneErrorSelector);

    const dispatch = useDispatch();


    useEffect(() => {
        dispatch(userQueryOneAction(userId));
    }, [userId]); //eslint-disable-line react-hooks/exhaustive-deps

    if (!user && !loading) {
        return <div>
            {error}
            <LinkTo to={`/users/${userId + 1}`}>Next User</LinkTo>
        </div>
    }

    return (
        <div className="mx-auto flex flex-col space-y-10 items-center appContainer_min_height">
            {loading && <Spinner type="button" />}
            {user && <div>{user.userData.firstName}
            <Avatar imgSrc={user.userData.profilePicUrl || ""}></Avatar></div>}
            <LinkTo to={`/users/${userId + 1}`}>Next User</LinkTo>
            <br /> i have yet not done the styling on website
        </div>
    );
};

UserDetails.defaultProps = {};

export default memo(UserDetails);