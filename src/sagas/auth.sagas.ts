import { all, takeEvery, call, put } from "@redux-saga/core/effects";
import { AnyAction } from "redux";
import { ME_AUTH_CHECK, ME_LOGIN, ME_SAVE_DATA, ME_SIGNUP, ME_UPDATE } from "../actions/actions.constants";
import { meAuthErrorMessageAction, meFetchAction, meFormSubmittingStatus, meLoginAction } from "../actions/auth.actions";
import { loginAPI, logout, meAPI, saveDataAPI, saveRoleToUserAPI, signupAPI, updateMeAPI } from "../APIs/auth";
import { LS_AUTH_TOKEN, LS_REFRESH_TOKEN } from "../Constants/constants";

function* meSignup(action: AnyAction): Generator<any> {
    yield put(meAuthErrorMessageAction(""));
    yield put(meFormSubmittingStatus(true));
    try {
        yield call(signupAPI, action.payload);
        yield call(saveRoleToUserAPI, action.payload);
        yield put(meLoginAction(action.payload));
    } catch (error) {
        console.log(error.response);
        yield put(meAuthErrorMessageAction(error.response.data.message));
        yield put(meFormSubmittingStatus(false));
    }
}

function* meLogin(action: AnyAction): Generator<any> {
    yield put(meAuthErrorMessageAction(""));
    yield put(meFormSubmittingStatus(true));
    try {
        const loginResponse: any = yield call(loginAPI, action.payload);
        localStorage.setItem(LS_AUTH_TOKEN, loginResponse.data.access_token);
        localStorage.setItem(LS_REFRESH_TOKEN, loginResponse.data.refresh_token);
        window.location.href = "/register";
    } catch (error) {
        yield put(meAuthErrorMessageAction("Invalid Credentials"));
        yield put(meFormSubmittingStatus(false));
    }
}

function* meSaveData(action: AnyAction): Generator<any> {
    yield put(meAuthErrorMessageAction(""));
    yield put(meFormSubmittingStatus(true));
    try {
        yield call(saveDataAPI, action.payload);
        window.location.href = "/dashboard";
    } catch (err) {
        yield put(meAuthErrorMessageAction("Cannot save your info!!"));
        yield put(meFormSubmittingStatus(false));
    }
}

function* meAuthCheck(action: AnyAction): Generator<any> {
    try {
        const meResponse: any = yield call(meAPI);
        yield put(meFetchAction(meResponse.data));
    } catch (err) {
        yield logout();
        window.location.href = "/login";
    }
}

function* meUpdate(action: AnyAction): Generator<any> {
    try {
        yield call(updateMeAPI, action.payload);
        window.location.href = "/me/profile";
    } catch (err) {
        console.log("Cannot save your info!!");
    }
}

export function* watchMeAuth() {
    yield all([
        takeEvery(ME_SIGNUP, meSignup),
        takeEvery(ME_LOGIN, meLogin),
        takeEvery(ME_SAVE_DATA, meSaveData),
        takeEvery(ME_AUTH_CHECK, meAuthCheck),
        takeEvery(ME_UPDATE, meUpdate),
    ]);
}