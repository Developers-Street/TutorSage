import { useFormik } from 'formik';
import { FC, memo, useEffect, useState } from 'react';
import ImageUploading from "react-images-uploading";
import { useAppSelector } from '../../store';
import * as yup from 'yup';
import Button from '../../sharedComponents/Button';
import EditInput from '../../sharedComponents/EditInput';
import { pathActions } from '../../actions/path.actions';
import { useDispatch } from 'react-redux';
import { meSaveDetailsAction } from '../../actions/auth.actions';
import { errorMessageSelector, isFormSubmittingSelector } from '../../selectors/auth.selectors';
import { uploadedProfilePicUrlSelector } from '../../selectors/cloudinary.selectors';
import { cloudinaryProfilePicUploadAction } from '../../actions/cloudinary.actions';

interface Props { }

const RegisterDetails: FC<Props> = (props) => {

    const errorMessage = useAppSelector(errorMessageSelector);

    const isFormSubmitting = useAppSelector(isFormSubmittingSelector);

    const uploadedProfilePicUrl = useAppSelector(uploadedProfilePicUrlSelector);

    useEffect(() => { pathActions.setPath(window.location.pathname.split("/").splice(1)); })

    const dispatch = useDispatch();

    const [profilePic, setProfilePic] = useState<any>("");

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
                profilePicUrl: ""
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
                data.profilePicUrl = uploadedProfilePicUrl;
                dispatch(meSaveDetailsAction(data));
            }
        });

    return (
        <div className={`w-full p-5 bg-gray-200 h-screen`}>
            {errorMessage ? errorMessage : ""}
            <form className={`space-y-5`} onSubmit={handleSubmit}>
                <div className={`p-5 bg-white border border-gray-300 rounded-lg`}>
                    <h1 className={`font-bold mb-10`}>GENERAL INFORMATION</h1>
                    <div className={`flex flex-row space-x-5`}>
                        <ImageUploading
                            value={profilePic}
                            onChange={(image) => setProfilePic(image)}
                            maxNumber={1}
                            dataURLKey="data_url"
                        >
                            {({
                                imageList,
                                onImageUpload,
                                onImageUpdate,
                                onImageRemove,
                                isDragging,
                                dragProps,
                            }) => (
                                <div className={`rounded-lg flex items-center ${imageList.length === 1 ? "" : "border border-black"}`}>
                                    {imageList.length !== 1 && <button
                                        type="button"
                                        className="h-32 w-32"
                                        style={isDragging ? { color: "red" } : undefined}
                                        onClick={onImageUpload}
                                        {...dragProps}
                                    >
                                        Profile Pic Click or Drop here
                                    </button>}
                                    {imageList.map((image, index) => (
                                        <div key={index} className="image-item">
                                            <img src={image["data_url"]} className="border-2 border-secondary-light w-32 h-32 rounded-lg" onClick={() => onImageRemove(index)} alt="" />
                                        </div>
                                    ))}
                                </div>
                            )}
                        </ImageUploading>
                        <button type="button" className="bg-success-light p-2 rounded-lg text-gray-500 border border-gray-500" onClick={() => dispatch(cloudinaryProfilePicUploadAction(profilePic[0].file))} >Upload Profile</button>
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