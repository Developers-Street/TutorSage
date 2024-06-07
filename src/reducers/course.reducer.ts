import { Reducer } from "redux";
import { COURSES_FETCH, COURSES_FETCH_ERROR, COURSES_QUERY, COURSE_FETCH_ONE, COURSE_FETCH_ONE_ERROR, COURSE_QUERY_ONE, CREATE_COURSE_IN_ORGANIZATION } from "../actions/actions.constants";
import { Course } from "../Models/Course";
import { addMany, addOne, EntityState, getIds, initialEntityState, selectMany, selectOne, setErrorForMany, setErrorForOne } from "./entity.reducer";

export interface CourseState extends EntityState<Course> {
    coursesId: number[];
}

const initialState = {
    ...initialEntityState,
    coursesId: []
}

export const courseReducer: Reducer<CourseState> = (
    state = initialState,
    action
) => {
    switch (action.type) {
        case CREATE_COURSE_IN_ORGANIZATION: return state;
        case COURSES_QUERY: return selectMany(state, action.payload) as CourseState;
        case COURSES_FETCH:
            const courses: Course[] = action.payload;
            const coursesId = getIds(courses);
            const newState = addMany(state, courses) as CourseState;

            return {
                ...newState,
                coursesId: coursesId,
                loadingList: false
            };
        case COURSES_FETCH_ERROR: return setErrorForMany(state, action.payload.query, action.payload.error) as CourseState;
        case COURSE_QUERY_ONE: return selectOne(state, action.payload) as CourseState;
        case COURSE_FETCH_ONE: return addOne(state, action.payload, false) as CourseState;
        case COURSE_FETCH_ONE_ERROR: const { id, msg } = action.payload;
            return setErrorForOne(state, id, msg) as CourseState;
        default:
            return state;
    }
}