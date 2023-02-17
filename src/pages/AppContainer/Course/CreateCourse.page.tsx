import { useFormik } from 'formik';
import { FC, memo, useEffect, useState } from 'react';
import * as yup from 'yup';
import { pathActions } from '../../../actions/path.actions';
import { useDispatch } from 'react-redux';
import EditInput from '../../../sharedComponents/EditInput';
import Button from '../../../sharedComponents/Button';
import { createCourseInOrganizationAction } from '../../../actions/course.actions';
import { useParams } from 'react-router-dom';
import EditSelect from '../../../sharedComponents/EditSelect';
import { useAppSelector } from '../../../store';
import { meSelector } from '../../../selectors/auth.selectors';
import { Me } from '../../../Models/Me';
import { User } from '../../../Models/User';
import { fetchOrganizationTutors } from '../../../APIs/organization';

interface Props { }

const CreateCourse: FC<Props> = (props) => {

    const organizationId = +useParams<{ oId: string }>().oId;

    const dispatch = useDispatch();

    const [headTutorQuery, setHeadTutorQuery] = useState<string>("");
    const [tutors, setTutors] = useState<User[]>();

    useEffect(() => {
        fetchOrganizationTutors({ organizationId, query: headTutorQuery }).then((response) => {
            setTutors(response.data);
        })
    }, [headTutorQuery])

    const me: Me = useAppSelector(meSelector);

    const { handleSubmit, errors, touched, isSubmitting, getFieldProps } =
        useFormik({
            initialValues: {
                name: "",
                headTutor: { id: me.id }
            },
            validationSchema: yup.object().shape({
                name: yup
                    .string()
                    .required("Name of the organization is required!!"),
            }),
            onSubmit: (data) => {
                dispatch(createCourseInOrganizationAction({ c: data, organizationId: organizationId }));
            }
        });

    return (
        <div className={`w-full p-5 bg-gray-200`}>
            <form onSubmit={handleSubmit} method="POST" className='space-y-2'>
                <EditInput
                    {...getFieldProps("name")}
                    errorMessage={errors.name}
                    touched={touched.name}
                    label="Name"
                    className='w-full'
                >
                </EditInput>
                <EditSelect
                    {...getFieldProps("type")}
                    label="Head Tutor"
                    className='min-w-28 sm:min-w-40 md:min-w-50'
                >
                    {tutors && tutors.map((user: User, index: number) => {
                        return <option>{user.userData.firstName} {user.userData.middleName} {user.userData.lastName}</option>
                    })}
                </EditSelect>
                <Button text="Create" className='w-20' type="submit" theme="success" disabled={isSubmitting}></Button>
            </form>
        </div >
    );
};

CreateCourse.defaultProps = {};

export default memo(CreateCourse);