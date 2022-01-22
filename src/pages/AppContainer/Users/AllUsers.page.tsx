import { FC, memo, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { pathActions } from "../../../actions/path.actions";
import { usersQueryAction } from "../../../actions/users.action";
import LinkTo from "../../../components/LinkTo";
import Spinner from "../../../sharedComponents/Spinner/Spinner";
import UserData from "../../../components/UserData";
import { usersFetchSelector, usersLoadingListSelector } from "../../../selectors/users.selector";
import { useAppSelector } from "../../../store";
import EditInput from "../../../sharedComponents/EditInput/EditInput";

interface Props { }

const AllUsers: FC<Props> = (props) => {

    useEffect(() => { pathActions.setPath(window.location.pathname.split("/").splice(1)); })

    const dispatch = useDispatch();

    const users = useAppSelector(usersFetchSelector);
    const loading = useAppSelector(usersLoadingListSelector);

    useEffect(() => {
        // dispatch(usersQueryAction());
    }, []); //eslint-disable-line react-hooks/exhaustive-deps

    return (
        <div>
            {loading && <Spinner />}
            <EditInput onChange={(e) => {dispatch(usersQueryAction((e.target as HTMLInputElement).value))}}></EditInput>
            {users.map((user, index) => {
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
        </div>
    );
};

AllUsers.defaultProps = {};

export default memo(AllUsers);