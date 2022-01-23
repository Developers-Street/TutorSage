import { useEffect } from "react";
import { FC, memo } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { classQueryOneAction } from "../../../actions/class.actions";
import Avatar from "../../../sharedComponents/Avatar/Avatar";
import LinkTo from "../../../components/LinkTo";
import Spinner from "../../../sharedComponents/Spinner/Spinner";
import { selectedClassSelector, classLoadingOneErrorSelector, classLoadingOneSelector } from "../../../selectors/class.selectors";
import { useAppSelector } from "../../../store";

interface Props { }

const ClassDetails: FC<Props> = (props) => {

    const classId = +useParams<{ id: string }>().id;

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
            <Avatar imgSrc={""}></Avatar></div>}
            <LinkTo to={`/class/${classId + 1}`}>Next class</LinkTo>
        </div>
    );
};

ClassDetails.defaultProps = {};

export default memo(ClassDetails);