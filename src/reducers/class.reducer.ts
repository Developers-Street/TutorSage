import { Reducer } from "redux";
import { CLASSES_FETCH, CLASSES_FETCH_ERROR, CLASSES_QUERY, CLASS_FETCH_ONE, CLASS_FETCH_ONE_ERROR, CLASS_QUERY_ONE, CREATE_CLASS, JOIN_CLASS } from "../actions/actions.constants";
import { Class } from "../Models/Class";
import { addMany, addOne, EntityState, getIds, initialEntityState, selectMany, selectOne, setErrorForMany, setErrorForOne } from "./entity.reducer";

export interface ClassState extends EntityState<Class> {
    classesId: number[];
}

const initialState = {
    ...initialEntityState,
    classesId: []
}

export const classReducer: Reducer<ClassState> = (
    state = initialState,
    action
) => {
    switch (action.type) {
        case JOIN_CLASS:
        case CREATE_CLASS: return state;
        
        case CLASSES_QUERY: return selectMany(state, action.payload) as ClassState;
        case CLASSES_FETCH:
            const classes: Class[] = action.payload;
            const classesId = getIds(classes);
            const newState = addMany(state, classes) as ClassState;

            return {
                ...newState,
                classesId: classesId,
                loadingList: false
            };
        case CLASSES_FETCH_ERROR: return setErrorForMany(state, action.payload.query, action.payload.error) as ClassState;
        case CLASS_QUERY_ONE: return selectOne(state, action.payload) as ClassState;
        case CLASS_FETCH_ONE: return addOne(state, action.payload, false) as ClassState;
        case CLASS_FETCH_ONE_ERROR: const {id, msg} = action.payload;
        return setErrorForOne(state, id, msg) as ClassState;
        default:
            return state;
    }
}