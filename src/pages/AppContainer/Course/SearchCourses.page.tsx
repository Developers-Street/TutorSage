import { FC, memo, useEffect } from "react";
import { useDispatch } from "react-redux";
import { pathActions } from "../../../actions/path.actions";
// import { classesQueryAction } from "../../../actions/class.actions";
import LinkTo from "../../../components/LinkTo";
import Spinner from "../../../sharedComponents/Spinner";
import { useAppSelector } from "../../../store";
import EditInput from "../../../sharedComponents/EditInput";
import { coursesFetchSelector, coursesLoadingListErrorSelector, coursesLoadingListSelector, coursesQuerySelector } from "../../../selectors/course.selectors";
import UserData from "../../../components/UserData";
import { Course } from "../../../Models/Course";
import { coursesQueryAction } from "../../../actions/course.actions";
// import { Class } from "../../../Models/Class";

interface Props { }

const SearchClasses: FC<Props> = (props) => {

    useEffect(() => { pathActions.setPath(window.location.pathname.split("/").splice(1)); })

    const dispatch = useDispatch();

    const courses = useAppSelector(coursesFetchSelector);
    const loading = useAppSelector(coursesLoadingListSelector);
    const query = useAppSelector(coursesQuerySelector);
    const error = useAppSelector(coursesLoadingListErrorSelector);

    return (
        <div>
            {loading && <Spinner type="button" />}
            <EditInput value={query} onChange={(e) => {
                dispatch(coursesQueryAction((e.target as HTMLInputElement).value))
            }
            }></EditInput>
            {!error && courses.map((c: Course, index: number) => {
                return (<div key={c.id}>
                    <LinkTo to={`/class/${c.id}`}>
                        <UserData
                            className={`${(index % 2 === 0) ? "bg-white" : "bg-gray-100"}`}
                            name={c.name}
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

SearchClasses.defaultProps = {};

export default memo(SearchClasses);