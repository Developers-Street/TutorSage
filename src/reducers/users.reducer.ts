import { Reducer } from "redux";
import { USERS_FETCH, USERS_FETCH_ERROR, USERS_QUERY, USER_FETCH_ONE, USER_FETCH_ONE_ERROR, USER_QUERY_ONE } from "../actions/actions.constants";
import { User } from "../Models/User";
import { addMany, addOne, EntityState, getIds, initialEntityState, selectMany, selectOne, setErrorForMany, setErrorForOne } from "./entity.reducer";

export interface UsersState extends EntityState<User> {
    usersId: number[];
}

const initialState = {
    ...initialEntityState,
    usersId: [],
};

export const usersReducer: Reducer<UsersState> = (
    state = initialState,
    action
) => {
    switch (action.type) {
        case USERS_QUERY: return selectMany(state, action.payload) as UsersState;
        case USERS_FETCH:
            const users: User[] = action.payload;
            const usersId = getIds(users);
            const newState = addMany(state, users) as UsersState;

            return {
                ...newState,
                usersId: usersId,
                loadingList: false
            }
        case USERS_FETCH_ERROR: return setErrorForMany(state, action.payload.query, action.payload.error) as UsersState;
        case USER_QUERY_ONE: return selectOne(state, action.payload) as UsersState;
        case USER_FETCH_ONE: return addOne(state, action.payload, false) as UsersState;
        case USER_FETCH_ONE_ERROR: const { id, msg } = action.payload;
            return setErrorForOne(state, id, msg) as UsersState;
        default:
            return state;
    }
}