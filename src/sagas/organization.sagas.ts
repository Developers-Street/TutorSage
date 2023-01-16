import { all, takeEvery, takeLatest, call, delay, put } from "@redux-saga/core/effects";
import { AnyAction } from "redux";
import { CREATE_ORGANIZATION, JOIN_ORGANIZATION, JOIN_ORGANIZATION_AS_STUDENT, ORGANIZATIONS_QUERY, ORGANIZATION_QUERY_ONE } from "../actions/actions.constants";
import { organizationFetchOneAction, organizationFetchOneErrorAction, organizationsFetchAction, organizationsFetchErrorAction } from "../actions/organization.actions";
import { createOrganizationAPI, fetchOneOrganizationAPI, fetchOrganizationsAPI, joinOrganizationAPI, joinOrganizationAsStudentAPI } from "../APIs/organization";

function* createOrganization(action: AnyAction): Generator<any> {
    try {
        yield call(createOrganizationAPI, action.payload);
        window.location.href = "/dashboard";
    } catch (error) {
        console.log(error);
    }
}

function* joinOrganization(action: AnyAction): Generator<any> {
    try {
        yield call(joinOrganizationAPI, action.payload);
        window.location.href = "/dashboard";
    } catch (error) {
        console.log(error.response.data.message);
    }
}

function* joinOrganizationAsStudent(action: AnyAction): Generator<any> {
    try {
        yield call(joinOrganizationAsStudentAPI, action.payload);
        window.location.href = "/dashboard";
    } catch (error) {
        console.log(error.response.data.message);
    }
}

function* organizationsFetch(action: AnyAction): Generator<any> {
    try {
        yield delay(1000);
        const organizationsResponse: any = yield call(fetchOrganizationsAPI, action.payload);
        yield put(organizationsFetchAction(organizationsResponse.data));
    } catch (err) {
        yield put(organizationsFetchErrorAction(action.payload, err.response.data.message));
    }
}

function* organizationFetchOne(action: AnyAction): Generator<any> {
    try {
        const organizationResponse: any = yield call(fetchOneOrganizationAPI, action.payload);
        yield put(organizationFetchOneAction(organizationResponse.data));
    } catch (e) {
        yield put(organizationFetchOneErrorAction(action.payload, e.response.data.message));
    }
}

export function* watchOrganizationActions() {
    yield all([
        takeEvery(JOIN_ORGANIZATION, joinOrganization),
        takeEvery(JOIN_ORGANIZATION_AS_STUDENT, joinOrganizationAsStudent),
        takeEvery(CREATE_ORGANIZATION, createOrganization),

        takeLatest(ORGANIZATIONS_QUERY, organizationsFetch),
        takeEvery(ORGANIZATION_QUERY_ONE, organizationFetchOne)
    ]);
}