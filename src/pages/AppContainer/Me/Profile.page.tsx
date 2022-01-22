import { FC, memo, useEffect } from 'react';
import { pathActions } from '../../../actions/path.actions';
import LinkTo from '../../../components/LinkTo';
import { useAppSelector } from '../../../store';

interface Props { }

const Profile: FC<Props> = (props) => {

    const user = useAppSelector((state) => state.auth.byId[state.auth.id!]);

    useEffect(() => { pathActions.setPath(window.location.pathname.split("/").splice(1)); })

    return (
        <div className="flex flex-col space-y-5">
            <LinkTo to="/me/profile/edit">Edit Profile</LinkTo>
            <LinkTo to="/dashboard">Go to dashboard</LinkTo>
            {user.username}
        </div>
    );
};

Profile.defaultProps = {};

export default memo(Profile);