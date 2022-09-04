import { FC, memo, useEffect } from "react";
import { useDispatch } from "react-redux";
import { pathActions } from "../../../actions/path.actions";
import { usersQueryAction } from "../../../actions/users.actions";
import LinkTo from "../../../components/LinkTo";
import Spinner from "../../../sharedComponents/Spinner";
import UserData from "../../../components/UserData";
import { usersFetchSelector, usersLoadingListErrorSelector, usersLoadingListSelector, usersQuerySelector } from "../../../selectors/users.selectors";
import { useAppSelector } from "../../../store";
import EditInput from "../../../sharedComponents/EditInput";

interface Props { }

const SearchUsers: FC<Props> = (props) => {

    useEffect(() => { pathActions.setPath(window.location.pathname.split("/").splice(1)); })

    const dispatch = useDispatch();

    const users = useAppSelector(usersFetchSelector);
    const loading = useAppSelector(usersLoadingListSelector);
    const query = useAppSelector(usersQuerySelector);
    const error = useAppSelector(usersLoadingListErrorSelector);

    return (
        <div>
            {loading && <Spinner type="button" />}
            <EditInput value={query} onChange={(e) => {
                dispatch(usersQueryAction((e.target as HTMLInputElement).value))
            }
            }></EditInput>
            {!error && users.map((user, index) => {
                return (<div key={user.id}>
                    <LinkTo to={`/users/${user.id}`}>
                        <UserData
                            className={`${(index % 2 === 0) ? "bg-white" : "bg-gray-100"}`}
                            name={`${user.userData.firstName} ${user.userData.middleName ? user.userData.middleName + " " : ""}${user.userData.lastName ? user.userData.lastName : ""}`}
                            // desc={user.bio}
                            imgSrc={user.userData.profilePicUrl || ""}
                        ></UserData>
                    </LinkTo>
                </div>);
            })}
            <div>{error}</div>
        </div>
    );
};

SearchUsers.defaultProps = {};

export default memo(SearchUsers);