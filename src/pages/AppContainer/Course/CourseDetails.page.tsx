import { FC, memo, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { courseQueryOneAction } from "../../../actions/course.actions";
import UserCard from "../../../components/UserCard";
import { Subject } from "../../../Models/Course";
import { User } from "../../../Models/User";
import { courseLoadingOneErrorSelector, courseLoadingOneSelector, selectedCourseSelector } from "../../../selectors/course.selectors";
import Spinner from "../../../sharedComponents/Spinner";
import { useAppSelector } from "../../../store";

interface Props {
    className?: String;
}

const CourseDetails: FC<Props> = ({ className }) => {
    const courseId = +useParams<{ cId: string }>().cId;

    const c = useAppSelector(selectedCourseSelector);
    const loading = useAppSelector(courseLoadingOneSelector);
    const error = useAppSelector(courseLoadingOneErrorSelector);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(courseQueryOneAction(courseId));
    }, [courseId]); //eslint-disable-line react-hooks/exhaustive-deps

    if (!c && !loading) {
        return <div>
            {error}
        </div>
    }
    return (
        <div className="mx-auto">
            {loading && <Spinner type="button" />}
            {c && <div className="mx-10 my-4">
                <h1 className="font-extrabold text-2xl">{c.name}</h1>
                <div className="mt-6">
                    <h2 className="font-bold text-lg">Subjects:</h2>
                    <table className="m-4 w-full table-auto">
                        <thead>
                            <tr className="text-left">
                                <th className="border-2 border-gray-300 p-1">Subject Name</th>
                                <th className="border-2 border-gray-300 p-1">Tutor</th>
                                <th className="border-2 border-gray-300 p-1">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {c.subjects.map((subject: Subject, index: number) => {
                                return <tr className="text-left">
                                    <td className="border-2 border-gray-300 p-1">{subject.name}</td>
                                    <td className="border-2 border-gray-300 p-1">{subject.tutor.username}</td>
                                    <td className="border-2 border-gray-300 p-1">View</td>
                                </tr>
                            })}
                        </tbody>
                    </table>
                </div>
                <div className="mt-6">
                    <h2 className="font-bold text-lg">Students:</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 max-h-72 pr-4 overflow-y-auto">
                        {c.students.map((student: User, index: number) => {
                            return <UserCard key={index} imgSrc={student.userData.profilePicUrl || ""} name={student.username} position={"ROLE_STUDENT"} uId={student.id}></UserCard>
                        })}
                    </div>
                </div>
            </div>}
        </div>
    );
};

CourseDetails.defaultProps = {};

export default memo(CourseDetails);