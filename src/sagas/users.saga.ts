import { all, takeEvery, takeLatest, call, put, delay } from "@redux-saga/core/effects";
import { AnyAction } from "redux";
import { USERS_QUERY, USER_QUERY_ONE } from "../actions/actions.constants";
import { userFetchOneAction, userFetchOneErrorAction, usersFetchAction, usersFetchErrorAction } from "../actions/users.actions";
import { fetchOneUser, fetchUsers } from "../APIs/users";

function* usersFetch(action: AnyAction): Generator<any> {
    try {
        yield delay(1000);
        const usersResponse: any = yield call(fetchUsers, action.payload);
        yield put(usersFetchAction(usersResponse.data));
    } catch (err) {
        yield put(usersFetchErrorAction(action.payload, err.response.data.message));
    }
}

function* userFetchOne(action: AnyAction): Generator<any> {
    try {
        const userResponse: any = yield call(fetchOneUser, action.payload);
        yield put(userFetchOneAction(userResponse.data));
    } catch (e) {
        const error = e.response.data.message || "Some Error Occured";
        yield put(userFetchOneErrorAction(action.payload, error));
    }
}

export function* watchUserActions() {
    yield all([
        takeLatest(USERS_QUERY, usersFetch),
        takeEvery(USER_QUERY_ONE, userFetchOne)
    ]);
}