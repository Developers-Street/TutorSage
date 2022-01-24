import { CLOUDINARY_PROFILE_PIC_UPLOAD, CLOUDINARY_STORE_PROFILE_PIC_URL } from "./actions.constants";

export const cloudinaryProfilePicUploadAction = (data: FileList | null) => ({type: CLOUDINARY_PROFILE_PIC_UPLOAD, payload: data});
export const storeUploadedProfilePicUrlAction = (url: string) => ({type: CLOUDINARY_STORE_PROFILE_PIC_URL, payload: url});