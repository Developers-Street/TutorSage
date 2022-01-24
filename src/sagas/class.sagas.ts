import { all, takeEvery, takeLatest, call, delay, put } from "@redux-saga/core/effects";
import { AnyAction } from "redux";
import { CLASSES_QUERY, CLASS_QUERY_ONE, CREATE_CLASS, JOIN_CLASS } from "../actions/actions.constants";
import { classesFetchAction, classesFetchErrorAction, classFetchOneAction, classFetchOneErrorAction } from "../actions/class.actions";
import { createClassAPI, fetchClassesAPI, fetchOneClassAPI, joinClassAPI } from "../APIs/class";

function* createClass(action: AnyAction): Generator<any> {
    try {
        yield call(createClassAPI, action.payload);
        window.location.href = "/dashboard";
    } catch (error) {
        console.log(error);
    }
}

function* joinClass(action: AnyAction): Generator<any> {
    try {
        yield call(joinClassAPI, action.payload);
        window.location.href = "/dashboard";
    } catch (error) {
        console.log(error.response.data.message);
    }
}

function* classesFetch(action: AnyAction): Generator<any> {
    try {
        yield delay(1000);
        const classesResponse: any = yield call(fetchClassesAPI, action.payload);
        yield put(classesFetchAction(classesResponse.data));
    } catch (err) {
        yield put(classesFetchErrorAction(action.payload, err.response.data.message));
    }
}

function* classFetchOne(action: AnyAction): Generator<any> {
    try {
        const classResponse: any = yield call(fetchOneClassAPI, action.payload);
        yield put(classFetchOneAction(classResponse.data));
    } catch (e) {
        yield put(classFetchOneErrorAction(action.payload, e.response.data.message));
    }
}

export function* watchClassActions() {
    yield all([
        takeEvery(JOIN_CLASS, joinClass),
        takeEvery(CREATE_CLASS, createClass),

        takeLatest(CLASSES_QUERY, classesFetch),
        takeEvery(CLASS_QUERY_ONE, classFetchOne)
    ]);
}