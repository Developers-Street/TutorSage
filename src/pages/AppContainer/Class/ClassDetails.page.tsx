import { useEffect } from "react";
import { FC, memo } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { classQueryOneAction, joinClassAction } from "../../../actions/class.actions";
import Avatar from "../../../sharedComponents/Avatar";
import LinkTo from "../../../components/LinkTo";
import Spinner from "../../../sharedComponents/Spinner";
import { selectedClassSelector, classLoadingOneErrorSelector, classLoadingOneSelector } from "../../../selectors/class.selectors";
import { useAppSelector } from "../../../store";
import { meSelector } from "../../../selectors/auth.selectors";
import Button from "../../../sharedComponents/Button";

interface Props { }

const ClassDetails: FC<Props> = (props) => {

    const classId = +useParams<{ id: string }>().id;

    const user = useAppSelector(meSelector);
    const c = useAppSelector(selectedClassSelector);
    const loading = useAppSelector(classLoadingOneSelector);
    const error = useAppSelector(classLoadingOneErrorSelector);

    const dispatch = useDispatch();


    useEffect(() => {
        dispatch(classQueryOneAction(classId));
    }, [classId]); //eslint-disable-line react-hooks/exhaustive-deps

    if (!c && !loading) {
        return <div>
            {error}
            <LinkTo to={`/classs/${classId + 1}`}>Next class</LinkTo>
        </div>
    }

    return (
        <div className="mx-auto flex flex-col space-y-10 items-center appContainer_min_height">
            {loading && <Spinner type="button" />}
            {c && <div>{c.name}
            <Avatar missingImageLetter={c.name[0]} imgSrc={""}></Avatar></div>}
            {user && user.roles && user.roles[0].name !== "ROLE_TUTOR" && <Button text="Join Class" onClick={() => {dispatch(joinClassAction({classId}))}}></Button>}
            {c && c.members[0] && c.members[0].username}
            <LinkTo to={`/class/${classId + 1}`}>Next class</LinkTo>
        </div>
    );
};

// ClassDetails.defaultProps = {};

export default memo(ClassDetails);