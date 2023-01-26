import { Course, CreateCourseFormData } from "../Models/Course";
import { COURSES_FETCH, COURSES_FETCH_ERROR, COURSES_QUERY, COURSE_FETCH_ONE, COURSE_FETCH_ONE_ERROR, COURSE_QUERY_ONE, CREATE_COURSE_IN_ORGANIZATION, JOIN_COURSE_IN_ORGANIZATION } from "./actions.constants";

export const createCourseInOrganizationAction = (data: { c: CreateCourseFormData, organizationId: number }) => ({ type: CREATE_COURSE_IN_ORGANIZATION, payload: data });
export const joinCourseInOrganizationAction = (data: { courseId: number }) => ({ type: JOIN_COURSE_IN_ORGANIZATION, payload: data });

export const coursesQueryAction = (query: string) => ({ type: COURSES_QUERY, payload: query });
export const coursesFetchAction = (courses: Course[]) => ({ type: COURSES_FETCH, payload: courses });
export const coursesFetchErrorAction = (query: string, error: string) => ({ type: COURSES_FETCH_ERROR, payload: { query, error } });

export const courseQueryOneAction = (id: number) => ({ type: COURSE_QUERY_ONE, payload: id });
export const courseFetchOneAction = (c: Course) => ({ type: COURSE_FETCH_ONE, payload: c });
export const courseFetchOneErrorAction = (id: number, msg: string) => ({ type: COURSE_FETCH_ONE_ERROR, payload: { id, msg } });