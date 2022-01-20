import { all, takeEvery, call, put } from "@redux-saga/core/effects";
import { AnyAction } from "redux";
import { CREATE_CLASS } from "../actions/actions.constants";
import { createClassAPI } from "../APIs/class";

function* createClass(action: AnyAction): Generator<any> {
    try {
        console.log("create class api");
        yield call(createClassAPI, action.payload);
        // window.location.href = "/dashboard";
    } catch (error) {
        console.log(error);
    }
}

export function* watchClassActions() {
    yield all([
        takeEvery(CREATE_CLASS, createClass),
    ]);
}