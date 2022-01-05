import { all, takeEvery, call, put } from "@redux-saga/core/effects";
import { AnyAction } from "redux";
import { ME_AUTH_CHECK, ME_LOGIN, ME_SAVE_DATA, ME_SIGNUP, ME_UPDATE } from "../actions/actions.constants";
import { meAuthErrorMessageAction, meFetchAction, meFormSubmittingStatus } from "../actions/auth.actions";
import { login, me, saveData, signup } from "../APIs/auth";
// import { login, me, updateMe } from "../APIs/auth";

function* meSignup(action: AnyAction): Generator<any> {
    yield put(meAuthErrorMessageAction(""));
    yield put(meFormSubmittingStatus(true));
    try{
        const signupResponse: any = yield call(signup, action.payload);
        yield put(meFetchAction(signupResponse));
    } catch(error) {
        yield put(meAuthErrorMessageAction(error.response.data));
        yield put(meFormSubmittingStatus(false));
    }
}

function* meLogin(action: AnyAction): Generator<any> {
    const loginResponse: any = yield call(login, action.payload);
    yield put(meFetchAction(loginResponse));
    window.location.href = "/dashboard";
}

function* meSaveData(action: AnyAction): Generator<any> {
    const saveDataResponse: any = yield call(saveData, action.payload);
    // window.location.href = "/dashboard";
}

function* meAuthCheck(action: AnyAction): Generator<any> {
    const meResponse: any = yield call(me);
    console.log(meResponse.data);
    yield put(meFetchAction(meResponse.data));
}

// function* meUpdate(action: AnyAction): Generator<any> {
//     console.log("saga running")
//     const meResponse: any = yield call(updateMe, action.payload);
//     console.log(meResponse?.data);
//     window.location.href = "/profile";
// }

export function* watchMeAuth() {
    yield all([
        takeEvery(ME_SIGNUP, meSignup),
        takeEvery(ME_LOGIN, meLogin),
        takeEvery(ME_SAVE_DATA, meSaveData),
        takeEvery(ME_AUTH_CHECK, meAuthCheck),
        // takeEvery(ME_UPDATE, meUpdate)
    ]);
}