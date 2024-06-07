import { FC, memo, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { courseQueryOneAction } from "../../../actions/course.actions";
import LinkTo from "../../../components/LinkTo";
import UserCard from "../../../components/UserCard";
import { Course, Subject } from "../../../Models/Course";
import { Me } from "../../../Models/Me";
import { User } from "../../../Models/User";
import { meSelector } from "../../../selectors/auth.selectors";
import { courseLoadingOneErrorSelector, courseLoadingOneSelector, selectedCourseSelector } from "../../../selectors/course.selectors";
import Spinner from "../../../sharedComponents/Spinner";
import { useAppSelector } from "../../../store";
import { RxCross2 } from 'react-icons/rx';
import EditInput from "../../../sharedComponents/EditInput";
import { fetchOrganizationTutors } from "../../../APIs/organization";
import { useFormik } from "formik";
import * as yup from 'yup';

interface Props {
    className?: String;
}

const CourseDetails: FC<Props> = ({ className }) => {
    const courseId = +useParams<{ cId: string }>().cId;
    const organizationId = +useParams<{ oId: string }>().oId;

    const c: Course = useAppSelector(selectedCourseSelector);
    const me: Me = useAppSelector(meSelector);
    const loading = useAppSelector(courseLoadingOneSelector);
    const error = useAppSelector(courseLoadingOneErrorSelector);

    const isHeadTutor = (c && c.headTutor.id === me.id);

    const [addSubjectPopUp, setAddSubjectPopUp] = useState<boolean>(false);

    const [searchTutor, setSearchTutor] = useState<boolean>();
    const [tutorQuery, setTutorQuery] = useState<string>("");
    const [tutors, setTutors] = useState<User[]>([]);

    const [subjectTutor, setSubjectTutor] = useState<number>(-1);

    const { handleSubmit, errors, touched, isSubmitting, getFieldProps } =
    useFormik({
        initialValues: {
            subject: "",
            tutor: { id: -1 }
        },
        validationSchema: yup.object().shape({
            name: yup
                .string()
                .required("Name of the course is required!!"),
        }),
        onSubmit: (data) => {
            data.tutor.id = subjectTutor;
            console.log(data);
            // dispatch(createCourseInOrganizationAction({ c: data, organizationId: organizationId }));
        }
    });


    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(courseQueryOneAction(courseId));
        fetchOrganizationTutors({ organizationId, query: "" }).then((response) => {
            setTutors(response.data);
        })
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
                    <div className="flex flex-row items-center justify-between">
                        <h2 className="font-bold text-lg">Subjects:</h2>
                        {isHeadTutor && <span className="cursor-pointer" onClick={() => setAddSubjectPopUp(true)}>Add Subjects</span>}
                    </div>
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
                                return <tr className="text-left" key={index}>
                                    <td className="border-2 border-gray-300 p-1">{subject.name}</td>
                                    <td className="border-2 border-gray-300 p-1">{subject.tutor.username}</td>
                                    <td className="border-2 border-gray-300 p-1">View</td>
                                </tr>
                            })}
                        </tbody>
                    </table>
                </div>
                <div className="mt-6">
                    <div className="flex flex-row justify-between">
                        <h2 className="font-bold text-lg">Students:</h2>
                        {isHeadTutor && <LinkTo to={`/organization/${organizationId}/course/${courseId}/students/manage`}>Manage Students</LinkTo>}
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 max-h-72 pr-4 overflow-y-auto">
                        {c.students.map((student: User, index: number) => {
                            return <UserCard key={index} imgSrc={student.userData.profilePicUrl || ""} name={student.username} position={"ROLE_STUDENT"} uId={student.id}></UserCard>
                        })}
                    </div>
                </div>
            </div>}
            {addSubjectPopUp && <div className="absolute min-w-100 min-h-70 top-1/3 left-1/3 p-2 rounded-md bg-gray-300">
                <div className="flex flex-row justify-between items-center">
                    <h1 className="font-bold">Add Subjects:</h1>
                    <RxCross2 className="text-xl cursor-pointer" onClick={() => setAddSubjectPopUp(false)}></RxCross2>
                </div>
                <form onSubmit={handleSubmit}>
                    <EditInput name="subject" placeholder="Subject" label="Subject Name:"></EditInput>
                    <div>
                        <label>
                            <span className={`text-xs text-gray-500`} >Tutor</span>
                            <input
                                autoComplete='off'
                                placeholder="Search Tutor"
                                onFocus={() => setSearchTutor(true)}
                                onBlur={() => setTimeout(() => {
                                    setSearchTutor(false);
                                }, 1000)}
                                onChange={(event) => { 
                                    setTutorQuery(event.target.value);
                                 }}
                                value={tutorQuery}
                                name="headTutor"
                                className={`outline-none w-full px-2.5 flex border rounded-md h-10 ${(searchTutor) ? "border-primary-medium shadow-primary" : "border-gray-400"}`}
                            />
                        </label>
                        {searchTutor && <div className='flex flex-col bg-white max-h-52 overflow-y-scroll'>
                            {tutors && tutors.map((tutor, index) => {
                                return <span key={index}
                                    className="cursor-pointer p-1 hover:bg-blue-400"
                                    onClick={() => {
                                        setSubjectTutor(tutor.id);
                                        setTutorQuery(tutor.userData.firstName + " " + tutor.userData.middleName + " " + tutor.userData.lastName);
                                    }}>
                                    {tutor.userData.firstName} {tutor.userData.middleName} {tutor.userData.lastName}
                                </span>
                            })}
                        </div>}
                    </div>
                    <button type="submit">Submit</button>
                </form>
            </div>}
        </div>
    );
};

CourseDetails.defaultProps = {};

export default memo(CourseDetails);