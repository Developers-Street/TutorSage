import { FC, memo, useState } from 'react';
import { useFormik } from 'formik';
import * as yup from "yup";
import Copyrights from '../../components/Copyrights';
import LinkTo from '../../components/LinkTo';
import InputField from '../../sharedComponents/InputField';
import Icon from '../../sharedComponents/Icons';
import Button from '../../sharedComponents/Button';
import FormSwitch from '../../sharedComponents/ToggleSwitch';
import { useDispatch } from 'react-redux';
import { meSignupAction } from '../../actions/auth.actions';
import { errorMessageSelector, isFormSubmittingSelector } from '../../selectors/auth.selectors';
import { useAppSelector } from '../../store';

interface Props { }

const Signup: FC<Props> = (props) => {

    const dispatch = useDispatch();

    const errorMessage = useAppSelector(errorMessageSelector);
    const isFormSubmitting = useAppSelector(isFormSubmittingSelector);

    const { handleSubmit, errors, touched, getFieldProps } =
        useFormik({
            initialValues: {
                username: "",
                email: "",
                password: "",
                role: "ROLE_STUDENT"
            },
            validationSchema: yup.object().shape({
                username: yup
                    .string()
                    .required("Username is required"),
                // .matches(/^[A-Za-z]\w{3,29}$/, "Username should start with a letter and should contain only alpha-numeric"),
                email: yup
                    .string()
                    // .email(() => "Email is invalid")
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
                {(errorMessage) ? errorMessage : ""}
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
                            <Icon theme="primary" className="mr-3" name="username"></Icon>
                        </InputField>
                        <InputField
                            {...getFieldProps("email")}
                            name="email"
                            type="text"
                            placeholder="Email"
                            touched={touched.email}
                            errorMessage={errors.email}
                        >
                            <Icon theme="primary" className="mr-3" name="email"></Icon>
                        </InputField>
                        <InputField
                            {...getFieldProps("password")}
                            name="password"
                            type={isShowPassword ? "text" : "password"}
                            placeholder="Password"
                            touched={touched.password}
                            errorMessage={errors.password}
                        >
                            <Icon theme="primary" className="mr-3" name="password"></Icon>
                        </InputField>
                    </div>
                    <div>
                        <select
                            {...getFieldProps("role")}
                            className={`outline-none border rounded-md h-10 w-20 border-gray-400`}
                            onFocus={(event) => { event.target.className = "outline-none border rounded-md h-10 w-20 border-primary-medium shadow-primary" }}
                            onBlur={(event) => { event.target.className = "outline-none border rounded-md h-10 w-20 border-gray-400" }}
                        >
                            <option value="ROLE_STUDENT">Student</option>
                            <option value="ROLE_TUTOR">Tutor</option>
                        </select>
                    </div>
                    <div>
                        <div className="text-secondary-light space-x-3">
                            <input type="checkbox" name="termAgreement" />
                            <label htmlFor="termAgreement">I agree to the <LinkTo to="/termsandconditions">terms and conditions</LinkTo></label>
                        </div>
                    </div>
                    <div className="flex flex-col sm:flex:row space-y-8 sm:space-y-0 justify-between">
                        <FormSwitch theme="primary" forSetting="Show Password" enabled={isShowPassword} setEnabled={() =>
                            setIsShowPassword(!isShowPassword)
                        }></FormSwitch>
                        <Button buttonSize="sm" text="Get Started!" buttonDisabled={isFormSubmitting} />
                    </div>
                </form>
                <Copyrights className="font-medium text-sm text-center" />
            </div>
        </div >
    );
};

Signup.defaultProps = {};

export default memo(Signup);