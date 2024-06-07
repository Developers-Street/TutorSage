import { useFormik } from 'formik';
import { FC, memo, useEffect, useState } from 'react';
import * as yup from 'yup';
import { useDispatch } from 'react-redux';
import EditInput from '../../../sharedComponents/EditInput';
import Button from '../../../sharedComponents/Button';
import { createCourseInOrganizationAction } from '../../../actions/course.actions';
import { useParams } from 'react-router-dom';
import { User } from '../../../Models/User';
import { fetchOrganizationTutors } from '../../../APIs/organization';

interface Props { }

const CreateCourse: FC<Props> = (props) => {

    const organizationId = +useParams<{ oId: string }>().oId;

    const dispatch = useDispatch();

    const [headTutorQuery, setHeadTutorQuery] = useState<string>("");
    const [tutors, setTutors] = useState<User[]>();

    const [searchHeadTutor, setSearchHeadTutor] = useState<boolean>(false);
    const [selectedHeadTutor, setSelectedHeadTutor] = useState<number>(-1);

    useEffect(() => {
        fetchOrganizationTutors({ organizationId, query: headTutorQuery }).then((response) => {
            setTutors(response.data);
        })
    }, [headTutorQuery]); //eslint-disable-line

    const { handleSubmit, errors, touched, isSubmitting, getFieldProps } =
        useFormik({
            initialValues: {
                name: "",
                headTutor: { id: -1 }
            },
            validationSchema: yup.object().shape({
                name: yup
                    .string()
                    .required("Name of the course is required!!"),
            }),
            onSubmit: (data) => {
                data.headTutor.id = selectedHeadTutor;
                dispatch(createCourseInOrganizationAction({ c: data, organizationId: organizationId }));
            }
        });

    return (
        <div className={`w-full p-5 bg-gray-200 rounded-md`}>
            <h1 className='text-lg font-bold'>Create Course</h1>
            <form onSubmit={handleSubmit} method="POST" className='space-y-2'>
                <EditInput
                    {...getFieldProps("name")}
                    errorMessage={errors.name}
                    touched={touched.name}
                    label="Name"
                    className='w-full'
                >
                </EditInput>
                <div>
                    <label>
                        <span className={`text-xs text-gray-500`} >Head Tutor</span>
                        <input
                            autoComplete='off'
                            onFocus={() => setSearchHeadTutor(true)}
                            onBlur={() => setTimeout(() => {
                                setSearchHeadTutor(false);
                            }, 1000)}
                            onChange={(event) => { setHeadTutorQuery(event.target.value) }}
                            value={headTutorQuery}
                            name="headTutor"
                            className={`outline-none w-full px-2.5 flex border rounded-md h-10 ${(searchHeadTutor) ? "border-primary-medium shadow-primary" : "border-gray-400"}`}
                        />
                    </label>
                    {searchHeadTutor && <div className='flex flex-col bg-white max-h-52 overflow-y-scroll'>
                        {tutors && tutors.map((tutor, index) => {
                            return <span key={index}
                                className="cursor-pointer p-1 hover:bg-blue-400"
                                onClick={() => {
                                    setSelectedHeadTutor(tutor.id);
                                    setHeadTutorQuery(tutor.userData.firstName + " " + tutor.userData.middleName + " " + tutor.userData.lastName);
                                }}>
                                {tutor.userData.firstName} {tutor.userData.middleName} {tutor.userData.lastName}
                            </span>
                        })}
                    </div>}
                </div>
                <Button text="Create" className='w-20' type="submit" theme="success" disabled={isSubmitting}></Button>
            </form>
        </div >
    );
};

CreateCourse.defaultProps = {};

export default memo(CreateCourse);