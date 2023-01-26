import axios from "axios";
import { CLOUDINARY_URL } from "../Constants/constants";


export const uploadUserProfilePic = async (file: any) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "tutorsage");
    formData.append("folder", "TutorSage/User Profile Picture");

    return await axios.post(CLOUDINARY_URL, formData);
}

export const uploadOrganizationLogoPic = async (file: any) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "tutorsage");
    formData.append("folder", "TutorSage/Organization Logo");

    return await axios.post(CLOUDINARY_URL, formData);
}