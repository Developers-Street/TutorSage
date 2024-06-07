import { useEffect } from 'react';
import { FC, memo } from 'react';
import { pathActions } from '../../actions/path.actions';
import Spinner from '../../sharedComponents/Spinner';
import { meSelector } from '../../selectors/auth.selectors';
import { useAppSelector } from '../../store';
import LinkTo from '../../components/LinkTo';

interface Props { }

const Dashboard: FC<Props> = (props) => {

    const user = useAppSelector(meSelector);

    useEffect(() => { pathActions.setPath(window.location.pathname.split("/").splice(1)); })

    if (!user) return <Spinner /> //check this line

    return (
        <div className="mx-auto flex flex-col items-center">
            <LinkTo to="/class/create" >Create Class</LinkTo>
            <div className="">Welcome {user.username} </div>
        </div>
    );
};

Dashboard.defaultProps = {};

export default memo(Dashboard);