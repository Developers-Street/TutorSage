import { CLOUDINARY_ORGANIZATION_LOGO_UPLOAD, CLOUDINARY_PROFILE_PIC_UPLOAD, CLOUDINARY_STORE_ORGANIZATION_LOGO_URL, CLOUDINARY_STORE_PROFILE_PIC_URL } from "./actions.constants";

export const cloudinaryProfilePicUploadAction = (data: FileList | null) => ({ type: CLOUDINARY_PROFILE_PIC_UPLOAD, payload: data });
export const cloudinaryOrganizationLogoUploadAction = (data: FileList | null) => ({ type: CLOUDINARY_ORGANIZATION_LOGO_UPLOAD, payload: data });
export const storeUploadedProfilePicUrlAction = (url: string) => ({ type: CLOUDINARY_STORE_PROFILE_PIC_URL, payload: url });
export const storeUploadedOrganizationLogoUrlAction = (url: string) => ({ type: CLOUDINARY_STORE_ORGANIZATION_LOGO_URL, payload: url });