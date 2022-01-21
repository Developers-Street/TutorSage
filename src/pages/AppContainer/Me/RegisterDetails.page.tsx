import { useFormik } from 'formik';
import { FC, memo, useEffect } from 'react';
import Avatar from '../../../sharedComponents/Avatar/Avatar';
import { useAppSelector } from '../../../store';
import * as yup from 'yup';
import Button from '../../../sharedComponents/Button/Button';
import EditInput from '../../../sharedComponents/EditInput/EditInput';
import { pathActions } from '../../../actions/path.actions';
import { useDispatch } from 'react-redux';
import { meSaveDetailsAction } from '../../../actions/auth.actions';
import { errorMessageSelector, isFormSubmittingSelector } from '../../../selectors/auth.selectors';
// import { meUpdateAction } from '../../../actions/auth.actions';

interface Props { }

const RegisterDetails: FC<Props> = (props) => {
    // const user = useAppSelector((state) => state.auth.byId[state.auth.id!]);

    const errorMessage = useAppSelector(errorMessageSelector);

    const isFormSubmitting = useAppSelector(isFormSubmittingSelector);

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

    const { handleSubmit, errors, touched, getFieldProps, handleReset } =
        useFormik({
            initialValues: {
                firstName: "",
                middleName: "",
                lastName: "",
                gender: "male",
                birthDay: 0,
                birthMonth: 0,
                birthYear: 0,
                phoneNumber: 0,
            },
            validationSchema: yup.object().shape({
                firstName: yup
                    .string()
                    .required("First Name is required field!"),
                middleName: yup
                    .string(),
                lastName: yup
                    .string()
                    .required("Last Name is required field!"),
                phoneNumber: yup
                    .string()
                    .required("Phone Number is required"),
            }),
            onSubmit: (data) => {
                dispatch(meSaveDetailsAction(data));
            }
        });

    return (
        <div className={`w-full p-5 bg-gray-200 h-screen`}>
            {errorMessage? errorMessage : ""}
            <form className={`space-y-5`} onSubmit={handleSubmit}>
                <div className={`p-5 bg-white border border-gray-300 rounded-lg`}>
                    <h1 className={`font-bold mb-10`}>GENERAL INFORMATION</h1>
                    <div className={`flex flex-row space-x-5`}>
                        <Avatar avatarSize="xl" shape="square" showStatus={false} imgSrc={""}></Avatar>
                        <div className={`flex flex-col w-full space-y-5`}>
                            <div className={`flex flex-row space-x-5`}>
                                <EditInput
                                    {...getFieldProps("firstName")}
                                    errorMessage={errors.firstName}
                                    touched={touched.firstName}
                                    label="First Name"
                                    className={`w-1/3`}
                                />
                                <EditInput
                                    {...getFieldProps("middleName")}
                                    errorMessage={errors.middleName}
                                    touched={touched.middleName}
                                    label="Middle Name"
                                    className={`w-1/3`}
                                />
                                <EditInput
                                    {...getFieldProps("lastName")}
                                    errorMessage={errors.lastName}
                                    touched={touched.lastName}
                                    label="Last Name"
                                    className={`w-1/3`}
                                />
                            </div>
                            <div className={`flex flex-row space-x-10`}>
                                <label htmlFor="dateOfBirth" className="flex flex-col">
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
                                <label htmlFor="dateOfBirth" className="flex flex-col">
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
                
        
                <div className={`p-5 bg-white border border-gray-300 rounded-lg`}>
                    <h1 className={`font-bold mb-4`}>Contact</h1>
                    <div className={`flex flex-col space-y-4`}>
                        
                        <div className={`flex flex-row space-x-5`}>
                            <EditInput
                                {...getFieldProps("phoneNumber")}
                                touched={touched.phoneNumber}
                                errorMessage={errors.phoneNumber}
                                label="Phone Number"
                                className="w-1/2"
                            />
                            
                        </div>
                    </div>
                </div>
                <div className={`fixed bottom-0 flex flex-row justify-between`} style={{ width: 'calc(100% - 164px)' }}>
                    <Button text="Reset All" type="reset" onClick={(event) => {
                        handleReset.call(null, event);
                    }} />
                    <Button text="Save Changes" type="submit" theme="success" disabled={isFormSubmitting} />
                </div>
            </form>
        </div >
    );
};

RegisterDetails.defaultProps = {};

export default memo(RegisterDetails);