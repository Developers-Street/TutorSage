import { useFormik } from 'formik';
import { FC, memo, useEffect } from 'react';
import * as yup from 'yup';
import { pathActions } from '../../../actions/path.actions';
import { useDispatch } from 'react-redux';
import EditInput from '../../../sharedComponents/EditInput';
import Button from '../../../sharedComponents/Button';
import { createCourseInOrganizationAction } from '../../../actions/course.actions';
import { useParams } from 'react-router-dom';

interface Props { }

const CreateCourse: FC<Props> = (props) => {

    const organizationId = +useParams<{ oId: string }>().oId;

    useEffect(() => { pathActions.setPath(window.location.pathname.split("/").splice(1)); })

    // useEffect(() => {
    //     dispatch(organizationQueryOneAction(organizationId));
    // }, [organizationId]); //eslint-disable-line react-hooks/exhaustive-deps

    // const organization: Organization = useAppSelector(selectedorganizationSelector);
    // let team;
    // if (organization) team = organization.userOrganizationRoles;

    const dispatch = useDispatch();

    const { handleSubmit, errors, touched, isSubmitting, getFieldProps } =
        useFormik({
            initialValues: {
                name: "",
                // headTutor: ""
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
                {/* <EditSelect
                    {...getFieldProps("type")}
                    errorMessage={errors.headTutor}
                    touched={touched.headTutor}
                    label="Head Tutor"
                    className='min-w-28 sm:min-w-40 md:min-w-50'
                >
                    {team && team.map((user: UserOrganizationRole, index: number) => {
                        return <option>{user.username}</option>
                    })}
                </EditSelect> */}
                <Button text="Create" className='w-20' type="submit" theme="success" disabled={isSubmitting}></Button>
            </form>
        </div >
    );
};

CreateCourse.defaultProps = {};

export default memo(CreateCourse);