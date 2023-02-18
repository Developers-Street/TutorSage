import { FC, memo, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { addStudentsToCourse, fetchNonAddedStudentsOfOrganization } from "../../../APIs/organization";
import UserCard from "../../../components/UserCard";
import { User } from "../../../Models/User";
import { courseLoadingOneErrorSelector, courseLoadingOneSelector } from "../../../selectors/course.selectors";
import Button from "../../../sharedComponents/Button";
import { useAppSelector } from "../../../store";
import { getNameOfTheUser } from "../../../utility/me";

interface Props {
    className?: String;
}

const ManageStudents: FC<Props> = ({ className }) => {
    const courseId = +useParams<{ cId: string }>().cId;
    const organizationId = +useParams<{ oId: string }>().oId;

    const loading = useAppSelector(courseLoadingOneSelector);
    const error = useAppSelector(courseLoadingOneErrorSelector);

    const [addStudentsFocused, setAddStudentsFocused] = useState<boolean>(false);
    const [searchStudentQuery, setSearchStudentQuery] = useState<string>("");

    const [nonAddedStudents, setNonAddedStudents] = useState<User[]>();

    const [studentsToAdd, setStudentsToAdd] = useState<User[]>([]);

    useEffect(() => {
        fetchNonAddedStudentsOfOrganization({ organizationId, courseId }).then((response) => {
            setNonAddedStudents(response.data);
        })
    }, [courseId, organizationId]); //eslint-disable-line react-hooks/exhaustive-deps


    const handleAddStudentsSubmit = () => {
        const studentIds: number[] = [];
        for(let student of studentsToAdd) {
            studentIds.push(student.id);
        }

        addStudentsToCourse({studentIds, organizationId, courseId}).then((response) => {
            console.log(response.data.message);
        })
    }

    if (!nonAddedStudents && !loading) {
        return <div>
            {error}
        </div>
    }

    return (
        <div className="mx-auto">
            <h1 className="font-bold text-2xl">Manage Students</h1>
            <div>
                <label>
                    <span className={`text-xs text-gray-500`} >Add Students</span>
                    <input
                        autoComplete='off'
                        onFocus={() => setAddStudentsFocused(true)}
                        onBlur={() => setTimeout(() => {
                            setAddStudentsFocused(false);
                        }, 1000)}
                        onChange={(event) => {
                            setSearchStudentQuery(event.target.value);
                        }}
                        value={searchStudentQuery}
                        name="headTutor"
                        className={`outline-none w-full px-2.5 flex border rounded-md h-10 ${(addStudentsFocused) ? "border-primary-medium shadow-primary" : "border-gray-400"}`}
                    />
                </label>
                {addStudentsFocused && <div className='flex flex-col bg-white max-h-52 overflow-y-scroll'>
                    {nonAddedStudents && nonAddedStudents.map((student, index) => {
                        if (searchStudentQuery === "" || getNameOfTheUser(student).toLowerCase().indexOf(searchStudentQuery.toLowerCase()) >= 0)
                            return <span key={index}
                                className="cursor-pointer p-1 hover:bg-blue-400"
                                onClick={() => {
                                    setStudentsToAdd([...studentsToAdd, student]);
                                    setNonAddedStudents(nonAddedStudents!.filter((st) => student.id !== st.id))
                                }}>
                                {student.userData.firstName} {student.userData.middleName} {student.userData.lastName}
                            </span>
                        return <></>
                    })}
                </div>}
                <div className="mt-4">
                    {studentsToAdd.map((student, index) => {
                        return <UserCard key={index} position="Student" uId={student.id} name={getNameOfTheUser(student)} imgSrc={student.userData.profilePicUrl}></UserCard>
                    })}
                </div>
                {studentsToAdd.length > 0 && <Button onClick={handleAddStudentsSubmit} theme="success" text="Add Students" className="px-2 mt-2"></Button>}
            </div>
        </div>
    );
};

ManageStudents.defaultProps = {};

export default memo(ManageStudents);