import { Reducer } from "redux";
import { MY_ORGANIZATIONS_FETCH, MY_ORGANIZATIONS_FETCH_ERROR, MY_ORGANIZATIONS_QUERY } from "../actions/actions.constants";
import { Organization } from "../Models/Organization";
import { addMany, EntityState, getIds, initialEntityState, selectMany, setErrorForMany } from "./entity.reducer";

export interface MyOrganizationState extends EntityState<Organization> {
    myOrganizationsId: number[];
}

const initialState = {
    ...initialEntityState,
    myOrganizationsId: []
}

export const myOrganizationReducer: Reducer<MyOrganizationState> = (
    state = initialState,
    action
) => {
    switch (action.type) {
        case MY_ORGANIZATIONS_QUERY: return selectMany(state, action.payload) as MyOrganizationState;
        case MY_ORGANIZATIONS_FETCH:
            const myOrganizations: Organization[] = action.payload;
            const myOrganizationsId = getIds(myOrganizations);
            const newState = addMany(state, myOrganizations) as MyOrganizationState;

            return {
                ...newState,
                myOrganizationsId: myOrganizationsId,
                loadingList: false
            };
        case MY_ORGANIZATIONS_FETCH_ERROR: return setErrorForMany(state, action.payload.query, action.payload.error) as MyOrganizationState;
        default:
            return state;
    }
}