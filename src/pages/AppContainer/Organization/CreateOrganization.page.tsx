import { useFormik } from 'formik';
import { FC, memo, useEffect } from 'react';
import * as yup from 'yup';
import { pathActions } from '../../../actions/path.actions';
import { useDispatch } from 'react-redux';
import EditInput from '../../../sharedComponents/EditInput';
import Button from '../../../sharedComponents/Button';
import { createOrganizationAction } from '../../../actions/organization.actions';

interface Props { }

const CreateOrganization: FC<Props> = (props) => {

    useEffect(() => { pathActions.setPath(window.location.pathname.split("/").splice(1)); })

    const dispatch = useDispatch();

    const { handleSubmit, errors, touched, isSubmitting, getFieldProps } =
        useFormik({
            initialValues: {
                name: "",
                email: ""
            },
            validationSchema: yup.object().shape({
                name: yup
                    .string()
                    .required("Name of the organization is required!!"),
                email: yup.string().required("Email of the organization is required!!")
            }),
            onSubmit: (data) => {
                dispatch(createOrganizationAction(data));
            }
        });

    return (
        <div className={`w-full p-5 bg-gray-200 h-screen`}>
            <form onSubmit={handleSubmit} method="POST">
                <EditInput
                    {...getFieldProps("name")}
                    errorMessage={errors.name}
                    touched={touched.name}
                    label="Name"
                    className=""
                >
                </EditInput>
                <EditInput
                    {...getFieldProps("email")}
                    errorMessage={errors.email}
                    touched={touched.email}
                    label="Email"
                    className=''
                ></EditInput>
                <Button text="Create" type="submit" theme="success" disabled={isSubmitting}></Button>
            </form>
        </div >
    );
};

CreateOrganization.defaultProps = {};

export default memo(CreateOrganization);