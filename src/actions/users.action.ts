import { User } from "../Models/User";
import { USERS_FETCH, USER_QUERY_ONE, USER_FETCH_ONE, USERS_QUERY, USER_FETCH_ONE_ERROR, USERS_FETCH_ERROR } from "./actions.constants";

export const usersQueryAction = (query: string) => ({ type: USERS_QUERY, payload: query });
export const usersFetchAction = (users: User[]) => ({ type: USERS_FETCH, payload: users });
export const usersFetchErrorAction = (query: string, error: string) => ({type: USERS_FETCH_ERROR, payload: {query, error}});

export const userQueryOneAction = (id: number) => ({ type: USER_QUERY_ONE, payload: id });
export const userFetchOneAction = (user: User) => ({ type: USER_FETCH_ONE, payload: user });
export const userFetchOneErrorAction = (id: number, msg: string) => ({ type: USER_FETCH_ONE_ERROR, payload: { id, msg } });