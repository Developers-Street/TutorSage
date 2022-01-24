import { all, takeEvery, call, put } from "@redux-saga/core/effects";
import { AnyAction } from "redux";
import { CLOUDINARY_PROFILE_PIC_UPLOAD } from "../actions/actions.constants";
import { storeUploadedProfilePicUrlAction } from "../actions/cloudinary.actions";
import { uploadImage } from "../APIs/cloudinary";

function* cloudinaryProfilePicUpload(action: AnyAction): Generator<any> {
    try {
        const response : any = yield call(uploadImage, action.payload);
        console.log(response.data.url);
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