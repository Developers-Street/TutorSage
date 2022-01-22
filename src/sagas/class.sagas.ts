import { all, takeEvery, call } from "@redux-saga/core/effects";
import { AnyAction } from "redux";
import { CREATE_CLASS, JOIN_CLASS } from "../actions/actions.constants";
import { createClassAPI, joinClassAPI } from "../APIs/class";

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
    } catch (error) {
        console.log(error);
    }
}

export function* watchClassActions() {
    yield all([
        takeEvery(JOIN_CLASS, joinClass),
        takeEvery(CREATE_CLASS, createClass),
    ]);
}