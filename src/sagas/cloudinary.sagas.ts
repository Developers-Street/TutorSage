import { all, takeEvery, call, put } from "@redux-saga/core/effects";
import { AnyAction } from "redux";
import { CLOUDINARY_PROFILE_PIC_UPLOAD } from "../actions/actions.constants";
import { storeUploadedProfilePicUrlAction } from "../actions/cloudinary.actions";
import { uploadUserProfilePic } from "../APIs/cloudinary";

function* cloudinaryProfilePicUpload(action: AnyAction): Generator<any> {
    try {
        const response: any = yield call(uploadUserProfilePic, action.payload);
        yield put(storeUploadedProfilePicUrlAction(response.data.url));
    } catch (err) {
        console.log(err);
    }
}


export function* watchCloudinaryUpload() {
    yield all([
        takeEvery(CLOUDINARY_PROFILE_PIC_UPLOAD, cloudinaryProfilePicUpload)
    ]);
}