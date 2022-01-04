import { FC, memo, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useFormik } from 'formik';
import * as yup from "yup";
import Copyrights from '../../components/Copyrights';
import LinkTo from '../../components/LinkTo';
import InputField from '../../components/InputField/InputField';
import Icon from '../../components/Icons/Icons';
import Button from '../../components/Button/Button';
import FormSwitch from '../../components/FormSwitch';
import { useDispatch } from 'react-redux';
import { meSignupAction } from '../../actions/auth.actions';

interface Props { }

const Signup: FC<Props> = (props) => {

    const dispatch = useDispatch();

    const { handleSubmit, errors, touched, isSubmitting, getFieldProps } =
        useFormik({
            initialValues: {
                username: "",
                email: "",
                password: ""
            },
            validationSchema: yup.object().shape({
                username: yup
                    .string()
                    .required("Username is required")
                    .matches(/^[A-Za-z]\w{3,29}$/, "Username should start with a letter and should contain only alpha-numeric"),
                email: yup
                    .string()
                    .email(() => "Email is invalid")
                    .required("Email is required field!"),
                password: yup
                    .string()
                    .required("Cannot login without a password")
                    .matches(
                        /^.*(?=.{8,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/,
                        "Password must contain at least 8 characters, one uppercase, one number and one special case character"
                    )
            }),
            onSubmit: (data) => {
                dispatch(meSignupAction(data));
            }
        });

    const [isShowPassword, setIsShowPassword] = useState(false);

    return (
        <div className="w-full">
            <div className="px-10 sm:px-0 flex flex-col justify-center min-h-screen space-y-16 mx-auto max-w-26rem">
                <div className="space-y-3">
                    <h1 className="text-5xl font-light">Get started with a free account</h1>
                    <h5 className="text-sm font-bold">Already have an account? <LinkTo to="/login" className="border-b border-primary-medium">Log in</LinkTo></h5>
                </div>
                <form onSubmit={handleSubmit} className="space-y-6" method="POST">
                    <div className="space-y-12">
                        <InputField
                            {...getFieldProps("username")}
                            name="username"
                            type="text"
                            placeholder="Username"
                            touched={touched.username}
                            errorMessage={errors.username}
                        >
                            <Icon className="mr-3" name="username"></Icon>
                        </InputField>
                        <InputField
                            {...getFieldProps("email")}
                            name="email"
                            type="email"
                            placeholder="Email"
                            touched={touched.email}
                            errorMessage={errors.email}
                        >
                            <Icon className="mr-3" name="email"></Icon>
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
                    <div>
                        <div className="text-secondary-light space-x-3">
                            <input type="checkbox" name="termAgreement" />
                            <label htmlFor="termAgreement">I agree to the <LinkTo to="/termsandconditions">terms and conditions</LinkTo></label>
                        </div>
                    </div>
                    <div className="flex flex-col sm:flex:row space-y-8 sm:space-y-0 justify-between">
                        <FormSwitch forSetting="Show Password" enabled={isShowPassword} setEnabled={() =>
                            setIsShowPassword(!isShowPassword)
                        }></FormSwitch>
                        <Button buttonSize="sm" text="Get Started!" buttonDisabled={isSubmitting} />
                    </div>
                </form>
                <Copyrights className="font-medium text-sm text-center" />
            </div>
        </div >
    );
};

Signup.defaultProps = {};

export default memo(Signup);