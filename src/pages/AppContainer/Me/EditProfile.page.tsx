import { useFormik } from 'formik';
import { FC, memo, useEffect } from 'react';
import Avatar from '../../../sharedComponents/Avatar/Avatar';
import { useAppSelector } from '../../../store';
import * as yup from 'yup';
import Button from '../../../sharedComponents/Button/Button';
import EditInput from '../../../sharedComponents/EditInput/EditInput';
import { pathActions } from '../../../actions/path.actions';
import { useDispatch } from 'react-redux';
import { meUpdateAction } from '../../../actions/auth.actions';

interface Props { }

const EditProfile: FC<Props> = (props) => {
    const user = useAppSelector((state) => state.auth.byId[state.auth.id!]);

    useEffect(() => { pathActions.setPath(window.location.pathname.split("/").splice(1)); })

    const dispatch = useDispatch();

    let day = [];
    let month = [];
    let year = [];

    for (let i = 1; i <= 31; i++) {
        if (i < 10) {
            day.push("0" + i.toString());
            month.push("0" + i.toString());
        }
        else if (i >= 10 && i <= 12) {
            day.push(i.toString());
            month.push(i.toString());
        }
        else day.push(i.toString());
    }
    for (let i = 1980; i <= 2012; i++) {
        year.push(i.toString());
    }

    const { handleSubmit, errors, touched, isSubmitting, getFieldProps, handleReset } =
        useFormik({
            initialValues: {
                firstName: user.userData.firstName || "",
                middleName: user.userData.middleName || "",
                lastName: user.userData.lastName || "",
                gender: user.userData.gender || "",
                birthDay: user.userData.birthDay || 0,
                birthMonth: user.userData.birthMonth || 0,
                birthYear: user.userData.birthYear || 0,
                phoneNumber: user.userData.phoneNumber || 0,
            },
            validationSchema: yup.object().shape({
                firstName: yup
                    .string()
                    .required("First Name is required field!"),
                middleName: yup
                    .string(),
                lastName: yup
                    .string(),
                phoneNumber: yup
                    .string()
                    .required("Phone Number is required")
            }),
            onSubmit: (formData) => {
                dispatch(meUpdateAction(formData));
            }
        });

    return (
        <form className={`w-full p-5 bg-white space-y-4`} onSubmit={handleSubmit}>
            <div className={`p-3 bg-primary-extra-light border border-gray-300 rounded-lg space-y-3`}>
                <h1 className={`font-bold`}>GENERAL INFORMATION</h1>
                <div className={`flex flex-col items-center justify-center space-y-3`}>
                    <Avatar avatarSize="xl" shape="square" showStatus={false} imgSrc={user.userData.profilePicUrl || ""}></Avatar>
                    <div className={`flex flex-col w-full space-y-3`}>
                        <div className={`flex flex-col sm:flex-row sm:space-x-3`}>
                            <EditInput
                                {...getFieldProps("firstName")}
                                errorMessage={errors.firstName}
                                touched={touched.firstName}
                                label="First Name"
                                className={`sm:w-1/3`}
                            />
                            <EditInput
                                {...getFieldProps("middleName")}
                                errorMessage={errors.middleName}
                                touched={touched.middleName}
                                label="Middle Name"
                                className={`sm:w-1/3`}
                            />
                            <EditInput
                                {...getFieldProps("lastName")}
                                errorMessage={errors.lastName}
                                touched={touched.lastName}
                                label="Last Name"
                                className={`sm:w-1/3`}
                            />
                        </div>
                        <div className={`flex flex-col sm:flex-row justify-center items-start sm:justify-between space-y-3 sm:space-y-0`}>
                            <label htmlFor="dateOfBirth" className="flex flex-col space-y-1">
                                <span className={`text-xs text-gray-500`} >Date of Birth</span>
                                <div className="flex flex-row space-x-2">
                                    <select
                                        {...getFieldProps("birthDay")}
                                        className={`outline-none border rounded-md h-10 w-16 border-gray-400`}
                                        onFocus={(event) => { event.target.className = "outline-none border rounded-md h-10 w-16 border-primary-medium shadow-primary" }}
                                        onBlur={(event) => { event.target.className = "outline-none border rounded-md h-10 w-16 border-gray-400" }}
                                    >
                                        <option>Day</option>
                                        {day.map((value, index) => {
                                            return <option key={index}>{value}</option>
                                        })}
                                    </select>
                                    <select
                                        {...getFieldProps("birthMonth")}
                                        className={`outline-none border rounded-md h-10 w-20 border-gray-400`}
                                        onFocus={(event) => { event.target.className = "outline-none border rounded-md h-10 w-20 border-primary-medium shadow-primary" }}
                                        onBlur={(event) => { event.target.className = "outline-none border rounded-md h-10 w-20 border-gray-400" }}
                                    >
                                        <option>Month</option>
                                        {month.map((value, index) => {
                                            return <option key={index}>{value}</option>
                                        })}
                                    </select>
                                    <select
                                        {...getFieldProps("birthYear")}
                                        className={`outline-none border rounded-md h-10 w-20 border-gray-400`}
                                        onFocus={(event) => { event.target.className = "outline-none border rounded-md h-10 w-20 border-primary-medium shadow-primary" }}
                                        onBlur={(event) => { event.target.className = "outline-none border rounded-md h-10 w-20 border-gray-400" }}
                                    >
                                        <option>Year</option>
                                        {year.map((value, index) => {
                                            return <option key={index}>{value}</option>
                                        })}
                                    </select>
                                </div>
                            </label>
                            <label htmlFor="dateOfBirth" className="flex flex-col space-y-1">
                                <span className={`text-xs text-gray-500`} >Gender</span>
                                <select
                                    {...getFieldProps("gender")}
                                    className={`outline-none border rounded-md h-10 w-20 border-gray-400`}
                                    onFocus={(event) => { event.target.className = "outline-none border rounded-md h-10 w-20 border-primary-medium shadow-primary" }}
                                    onBlur={(event) => { event.target.className = "outline-none border rounded-md h-10 w-20 border-gray-400" }}
                                >
                                    <option value="male">Male</option>
                                    <option value="female">Female</option>
                                    <option value="other">Other</option>
                                </select>
                            </label>
                        </div>
                    </div>
                </div>
            </div>
            <div className={`p-3 bg-primary-extra-light border border-gray-300 rounded-lg space-y-3`}>
                <h1 className={`font-bold`}>Contact</h1>
                <EditInput
                    {...getFieldProps("phoneNumber")}
                    touched={touched.phoneNumber}
                    errorMessage={errors.phoneNumber}
                    label="Phone Number"
                    className="w-full"
                />
            </div>
            <div className={`flex flex-row justify-between`}>
                <Button text="Reset All" type="reset" onClick={(event) => {
                    handleReset.call(null, event);
                }} />
                <Button text="Save Changes" type="submit" theme="success" disabled={isSubmitting} />
            </div>
        </form>
    );
};

EditProfile.defaultProps = {};

export default memo(EditProfile);