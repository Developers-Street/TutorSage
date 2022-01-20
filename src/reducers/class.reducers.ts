import { Reducer } from "redux";
import { CREATE_CLASS} from "../actions/actions.constants";
import { Me } from "../Models/Me";
import { EntityState, initialEntityState } from "./entity.reducer";

export interface ClassState extends EntityState<Me> {
    id?: number;
}

const initialState = {
    ...initialEntityState
}

export const classReducer: Reducer<ClassState> = (
    state = initialState,
    action
) => {
    switch (action.type) {
        case CREATE_CLASS: return state;
        default:
            return state;
    }
}