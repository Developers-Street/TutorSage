import { Reducer } from "redux";
import { CLOUDINARY_ORGANIZATION_LOGO_UPLOAD, CLOUDINARY_PROFILE_PIC_UPLOAD, CLOUDINARY_STORE_ORGANIZATION_LOGO_URL, CLOUDINARY_STORE_PROFILE_PIC_URL } from "../actions/actions.constants";
import { initialEntityState } from "./entity.reducer";

export interface CloudinaryState {
    uploadedProfilePicUrl: string;
    uploadedOrganizationLogoUrl: string;
}

const initialState = {
    ...initialEntityState,
    uploadedProfilePicUrl: "",
    uploadedOrganizationLogoUrl: ""
}

export const cloudinaryReducer: Reducer<CloudinaryState> = (
    state = initialState,
    action
) => {
    switch (action.type) {
        case CLOUDINARY_PROFILE_PIC_UPLOAD:
        case CLOUDINARY_ORGANIZATION_LOGO_UPLOAD: return state;
        case CLOUDINARY_STORE_PROFILE_PIC_URL: return {
            ...state, uploadedProfilePicUrl: action.payload
        };
        case CLOUDINARY_STORE_ORGANIZATION_LOGO_URL: return {
            ...state, uploadedOrganizationLogoUrl: action.payload
        }
        default:
            return state;
    }
}