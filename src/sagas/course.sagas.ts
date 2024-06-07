import { all, takeEvery, takeLatest, call, delay, put } from "@redux-saga/core/effects";
import { AnyAction } from "redux";
import { COURSES_QUERY, COURSE_QUERY_ONE, CREATE_COURSE_IN_ORGANIZATION } from "../actions/actions.constants";
import { courseFetchOneAction, courseFetchOneErrorAction, coursesFetchAction, coursesFetchErrorAction } from "../actions/course.actions";
import { createCourseInOrganizationAPI, fetchCoursesAPI, fetchOneCourseAPI } from "../APIs/course";


function* createCourseInOrganization(action: AnyAction): Generator<any> {
    try {
        yield call(createCourseInOrganizationAPI, action.payload.c, action.payload.organizationId);
        window.location.href = "/organization/" + action.payload.organizationId;
    } catch (error) {
        console.log(error);
    }
}

// function* joinCourse(action: AnyAction): Generator<any> {
//     try {
//         yield call(joinClassAPI, action.payload);
//         window.location.href = "/dashboard";
//     } catch (error) {
//         console.log(error.response.data.message);
//     }
// }

function* coursesFetch(action: AnyAction): Generator<any> {
    try {
        yield delay(1000);
        const coursesResponse: any = yield call(fetchCoursesAPI, action.payload);
        yield put(coursesFetchAction(coursesResponse.data));
    } catch (err) {
        yield put(coursesFetchErrorAction(action.payload, err.response.data.message));
    }
}

function* courseFetchOne(action: AnyAction): Generator<any> {
    try {
        const courseResponse: any = yield call(fetchOneCourseAPI, action.payload);
        yield put(courseFetchOneAction(courseResponse.data));
    } catch (e) {
        yield put(courseFetchOneErrorAction(action.payload, e.response.data.message));
    }
}

export function* watchCourseActions() {
    yield all([
        takeEvery(CREATE_COURSE_IN_ORGANIZATION, createCourseInOrganization),
        // takeEvery(JOIN_CLASS, joinClass),
        takeLatest(COURSES_QUERY, coursesFetch),
        takeEvery(COURSE_QUERY_ONE, courseFetchOne)
    ]);
}