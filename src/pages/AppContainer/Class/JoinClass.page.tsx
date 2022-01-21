import { FC, memo, useEffect } from 'react';
import { pathActions } from '../../../actions/path.actions';
import { useDispatch } from 'react-redux';
import Button from '../../../components/Button/Button';
import { joinClassAction } from '../../../actions/class.actions';

interface Props { }

const JoinClass: FC<Props> = (props) => {

    useEffect(() => { pathActions.setPath(window.location.pathname.split("/").splice(1)); })

    const dispatch = useDispatch();

    return (
        <div className={`w-full p-5 bg-gray-200 h-screen`}>
            <Button text="Join Class" onClick={() => {
                const data = {
                    classId: 11
                }
                dispatch(joinClassAction(data));
            }}></Button>
        </div >
    );
};

JoinClass.defaultProps = {};

export default memo(JoinClass);