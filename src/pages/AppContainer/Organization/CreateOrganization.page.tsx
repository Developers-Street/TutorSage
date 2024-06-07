import { useFormik } from 'formik';
import { FC, memo, useEffect, useState } from 'react';
import * as yup from 'yup';
import ImageUploading from 'react-images-uploading';
import { pathActions } from '../../../actions/path.actions';
import { useDispatch } from 'react-redux';
import EditInput from '../../../sharedComponents/EditInput';
import Button from '../../../sharedComponents/Button';
import { createOrganizationAction } from '../../../actions/organization.actions';
import EditTextArea from '../../../sharedComponents/EditTextArea';
import EditSelect from '../../../sharedComponents/EditSelect';
import { cloudinaryOrganizationLogoUploadAction } from '../../../actions/cloudinary.actions';
import { useAppSelector } from '../../../store';
import { uploadedOrganizationLogoUrlSelector } from '../../../selectors/cloudinary.selectors';
import { OrganizationType } from '../../../Models/Organization';

interface Props { }

const CreateOrganization: FC<Props> = (props) => {

    useEffect(() => { pathActions.setPath(window.location.pathname.split("/").splice(1)); })

    const [logoPic, setLogoPic] = useState<any>("");

    const dispatch = useDispatch();

    const uploadedLogoUrl = useAppSelector(uploadedOrganizationLogoUrlSelector);

    const { handleSubmit, errors, touched, isSubmitting, getFieldProps } =
        useFormik({
            initialValues: {
                name: "",
                email: "",
                desciption: "",
                type: OrganizationType.college,
                logoUrl: ""
            },
            validationSchema: yup.object().shape({
                name: yup
                    .string()
                    .required("Name of the organization is required!!"),
                email: yup.string().required("Email of the organization is required!!"),
                type: yup.mixed<OrganizationType>().oneOf(Object.values(OrganizationType)).required()
            }),
            onSubmit: (data) => {
                data.logoUrl = uploadedLogoUrl;
                dispatch(createOrganizationAction(data));
            }
        });

    return (
        <div className={`w-full p-5 bg-gray-200`}>
            <form onSubmit={handleSubmit} method="POST" className='space-y-2'>
                <ImageUploading
                    value={logoPic}
                    onChange={(image) => setLogoPic(image)}
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
                        <div className={`rounded-lg max-w-max flex items-center ${imageList.length === 1 ? "" : "border border-black"}`}>
                            {imageList.length !== 1 && <button
                                type="button"
                                className="h-32 w-32"
                                style={isDragging ? { color: "red" } : undefined}
                                onClick={onImageUpload}
                                {...dragProps}
                            >
                                Organization Logo Click or Drop here
                            </button>}
                            {imageList.map((image, index) => (
                                <div key={index} className="image-item">
                                    <img src={image["data_url"]} className="border-2 border-secondary-light w-32 h-32 rounded-lg" onClick={() => onImageRemove(index)} alt="" />
                                </div>
                            ))}
                        </div>
                    )}
                </ImageUploading>
                <button type="button" className="bg-success-light p-2 rounded-lg text-gray-500 border border-gray-500" onClick={() => dispatch(cloudinaryOrganizationLogoUploadAction(logoPic[0].file))} >Upload Logo</button>
                <div className='flex flex-col xs:flex-row xs:space-x-2 w-full'>
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
                        errorMessage={errors.type}
                        touched={touched.type}
                        label="Type"
                        className='min-w-28 sm:min-w-40 md:min-w-50'
                    >
                        <option value="school">School</option>
                        <option value="college">College</option>
                        <option value="coaching">Coaching</option>
                    </EditSelect>
                </div>
                <EditInput
                    {...getFieldProps("email")}
                    errorMessage={errors.email}
                    touched={touched.email}
                    label="Email"
                    className=''
                ></EditInput>
                <EditTextArea
                    {...getFieldProps("description")}
                    errorMessage={errors.desciption}
                    touched={touched.desciption}
                    label="Description"
                ></EditTextArea>
                <Button text="Create" className='w-20' type="submit" theme="success" disabled={isSubmitting}></Button>
            </form>
        </div >
    );
};

CreateOrganization.defaultProps = {};

export default memo(CreateOrganization);