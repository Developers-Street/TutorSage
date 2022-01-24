import { Reducer } from "redux";
import { CLOUDINARY_PROFILE_PIC_UPLOAD, CLOUDINARY_STORE_PROFILE_PIC_URL } from "../actions/actions.constants";
import { initialEntityState } from "./entity.reducer";

export interface CloudinaryState {
    uploadedProfilePicUrl: string;
}

const initialState = {
    ...initialEntityState,
    uploadedProfilePicUrl: ""
}

export const cloudinaryReducer: Reducer<CloudinaryState> = (
    state = initialState,
    action
) => {
    switch (action.type) {
        case CLOUDINARY_PROFILE_PIC_UPLOAD: return state;
        case CLOUDINARY_STORE_PROFILE_PIC_URL: return {
            ...state, uploadedProfilePicUrl: action.payload
        };
        default:
            return state;
    }
}