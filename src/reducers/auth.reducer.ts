import { Reducer } from "redux";
import { FORM_SUBMITTING_STATUS, ME_AUTH_CHECK, ME_AUTH_ERROR_MESSAGE, ME_FETCH, ME_LOGIN, ME_SAVE_DATA, ME_SIGNUP, ME_UPDATE } from "../actions/actions.constants";
import { Me } from "../Models/Me";
import { addOne, EntityState, initialEntityState } from "./entity.reducer";

export interface AuthState extends EntityState<Me> {
    id?: number;
}

const initialState = {
    ...initialEntityState
}

export const authReducer: Reducer<AuthState> = (
    state = initialState,
    action
) => {
    switch (action.type) {
        case ME_UPDATE:
        case ME_AUTH_CHECK:
        case ME_SIGNUP:
        case ME_SAVE_DATA:
        case ME_LOGIN: return state;
        case ME_AUTH_ERROR_MESSAGE: return {...state, errorMessage: action.payload};
        case FORM_SUBMITTING_STATUS: return {...state, isFormSubmitting: action.payload};
        case ME_FETCH:
            const userId = action.payload.id as number;
            const newState = addOne(state, action.payload) as AuthState;
            return {
                ...newState,
                id: userId
            };
        default:
            return state;
    }
}