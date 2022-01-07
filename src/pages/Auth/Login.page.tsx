import { FC, memo, useState } from 'react';
import { useFormik } from 'formik';
import * as yup from "yup";
import Copyrights from '../../components/Copyrights';
import LinkTo from '../../components/LinkTo';
import InputField from '../../components/InputField/InputField';
import Icon from '../../components/Icons/Icons';
import Button from '../../components/Button/Button';
import FormSwitch from '../../components/FormSwitch';
import { useDispatch } from 'react-redux';
import { meLoginAction } from '../../actions/auth.actions';
import { useAppSelector } from '../../store';
import { errorMessageSelector, isFormSubmittingSelector } from '../../selectors/auth.selectors';

interface Props {
}

const Login: FC<Props> = (props) => {

    const dispatch = useDispatch();
    
    const errorMessage = useAppSelector(errorMessageSelector);

    const isFormSubmitting = useAppSelector(isFormSubmittingSelector);

    const { handleSubmit, errors, touched, getFieldProps } =
        useFormik({
            initialValues: {
                username: "",
                password: ""
            },
            validationSchema: yup.object().shape({
                username: yup
                    .string()
                    .required("Username is required field"),
                password: yup
                    .string()
                    .required("Cannot login without a password")
            }),
            onSubmit: (data) => {
                dispatch(meLoginAction(data));
            }
        });

    const [isShowPassword, setIsShowPassword] = useState(false);

    return (
        <div className="w-full">
            <div className="px-10 sm:px-0 flex flex-col justify-center min-h-screen space-y-16 mx-auto max-w-26rem">
                <div className="space-y-3">
                    <h1 className="text-4xl font-normal">Log In to <span className="text-primary-dark font-bold">TUTORSAGE</span></h1>
                    <h5 className="text-sm font-bold">New Here? <LinkTo to="/signup" className="border-b border-primary-dark">Create an account</LinkTo></h5>
                </div>
                {errorMessage ? errorMessage : ""}
                <form onSubmit={handleSubmit} className="space-y-6" method="POST">
                    <div className="space-y-12">
                        <InputField
                            {...getFieldProps("username")}
                            name="username"
                            type="username"
                            placeholder="Username"
                            touched={touched.username}
                            errorMessage={errors.username}
                        >
                            <Icon className="mr-3" name="username"></Icon>
                        </InputField>
                        <InputField
                            {...getFieldProps("password")}
                            name="password"
                            type={isShowPassword ? "text" : "password"}
                            placeholder="Password"
                            touched={touched.password}
                            errorMessage={errors.password}
                        >
                            <Icon className="mr-3" name="password"></Icon>
                        </InputField>
                    </div>
                    <div className="flex flex-col sm:flex-row space-y-8 sm:space-y-0 justify-between">
                        <FormSwitch forSetting="Show Password" enabled={isShowPassword} setEnabled={() =>
                            setIsShowPassword(!isShowPassword)
                        }></FormSwitch>
                        <Button buttonSize="sm" theme="primary" buttonStyle="outline" text="Log in" buttonDisabled={isFormSubmitting} />
                    </div>
                    <div className="flex flex-col text-center space-y-4 pt-8">
                        <div className="text-secondary-light space-x-3">
                            <input type="checkbox" name="keepLoggedIn" />
                            <label htmlFor="keepLoggedIn">Keep me logged in</label>
                        </div>
                        <LinkTo to="/forgot-password" className="font-bold">Forgot Password?</LinkTo>
                    </div>
                </form>
                <Copyrights className="font-medium text-sm text-center" />
            </div>
        </div>
    );
};

Login.defaultProps = {};

export default memo(Login);