import { Class, CreateClassFormData } from "../Models/Class";
import { CLASSES_FETCH, CLASSES_FETCH_ERROR, CLASSES_QUERY, CLASS_FETCH_ONE, CLASS_FETCH_ONE_ERROR, CLASS_QUERY_ONE, CREATE_CLASS, JOIN_CLASS } from "./actions.constants";

export const createClassAction = (c: CreateClassFormData) => ({type: CREATE_CLASS, payload: c});
export const joinClassAction = (data: {classId: number}) => ({type: JOIN_CLASS, payload: data});

export const classesQueryAction = (query: string) => ({ type: CLASSES_QUERY, payload: query });
export const classesFetchAction = (classes: Class[]) => ({ type: CLASSES_FETCH, payload: classes });
export const classesFetchErrorAction = (query: string, error: string) => ({type: CLASSES_FETCH_ERROR, payload: {query, error}});

export const classQueryOneAction = (id: number) => ({ type: CLASS_QUERY_ONE, payload: id });
export const classFetchOneAction = (c: Class) => ({ type: CLASS_FETCH_ONE, payload: c });
export const classFetchOneErrorAction = (id: number, msg: string) => ({ type: CLASS_FETCH_ONE_ERROR, payload: { id, msg } });