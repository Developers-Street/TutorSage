import { all, takeEvery, takeLatest, call, delay, put } from "@redux-saga/core/effects";
import { AnyAction } from "redux";
import { CREATE_ORGANIZATION, JOIN_ORGANIZATION, MY_ORGANIZATIONS_QUERY, ORGANIZATIONS_QUERY, ORGANIZATION_QUERY_ONE } from "../actions/actions.constants";
import { myOrganizationsFetchAction, myOrganizationsFetchErrorAction } from "../actions/myOrganization.actions";
import { organizationFetchOneAction, organizationFetchOneErrorAction, organizationsFetchAction, organizationsFetchErrorAction } from "../actions/organization.actions";
import { createOrganizationAPI, fetchMyOrganizationAPI, fetchOneOrganizationAPI, fetchOrganizationsAPI, joinOrganizationAPI } from "../APIs/organization";

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
        window.location.href = "/organization/" + action.payload.organizationId.toString();
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

function* myOrganizationsFetch(action: AnyAction): Generator<any> {
    try {
        const myOrganizationResponse: any = yield call(fetchMyOrganizationAPI, action.payload);
        yield put(myOrganizationsFetchAction(myOrganizationResponse.data));
    } catch (e) {
        yield put(myOrganizationsFetchErrorAction(action.payload, e.response.data.message));
    }
}

export function* watchOrganizationActions() {
    yield all([
        takeEvery(JOIN_ORGANIZATION, joinOrganization),
        takeEvery(CREATE_ORGANIZATION, createOrganization),

        takeLatest(ORGANIZATIONS_QUERY, organizationsFetch),
        takeEvery(ORGANIZATION_QUERY_ONE, organizationFetchOne),
        takeEvery(MY_ORGANIZATIONS_QUERY, myOrganizationsFetch)
    ]);
}