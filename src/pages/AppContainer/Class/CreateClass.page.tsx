import { useFormik } from 'formik';
import { FC, memo, useEffect } from 'react';
import * as yup from 'yup';
import { pathActions } from '../../../actions/path.actions';
import { useDispatch } from 'react-redux';
import EditInput from '../../../sharedComponents/EditInput';
import Button from '../../../sharedComponents/Button/Button';
import { createClassAction } from '../../../actions/class.actions';

interface Props { }

const CreateClass: FC<Props> = (props) => {

    useEffect(() => { pathActions.setPath(window.location.pathname.split("/").splice(1)); })

    const dispatch = useDispatch();

    const { handleSubmit, errors, touched, isSubmitting, getFieldProps } =
        useFormik({
            initialValues: {
                name: ""
            },
            validationSchema: yup.object().shape({
                name: yup
                    .string()
                    .required("Name of the class is required!!"),
            }),
            onSubmit: (data) => {
                dispatch(createClassAction(data));
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
                <Button text="Create" type="submit" theme="success" disabled={isSubmitting}></Button>
            </form>
        </div >
    );
};

CreateClass.defaultProps = {};

export default memo(CreateClass);