import { Reducer } from "redux";
import { CREATE_ORGANIZATION, JOIN_ORGANIZATION, JOIN_ORGANIZATION_AS_STUDENT, ORGANIZATIONS_FETCH, ORGANIZATIONS_FETCH_ERROR, ORGANIZATIONS_QUERY, ORGANIZATION_FETCH_ONE, ORGANIZATION_FETCH_ONE_ERROR, ORGANIZATION_QUERY_ONE } from "../actions/actions.constants";
import { Organization } from "../Models/Organization";
import { addMany, addOne, EntityState, getIds, initialEntityState, selectMany, selectOne, setErrorForMany, setErrorForOne } from "./entity.reducer";

export interface OrganizationState extends EntityState<Organization> {
    organizationsId: number[];
}

const initialState = {
    ...initialEntityState,
    organizationsId: []
}

export const organizationReducer: Reducer<OrganizationState> = (
    state = initialState,
    action
) => {
    switch (action.type) {
        case JOIN_ORGANIZATION:
        case JOIN_ORGANIZATION_AS_STUDENT:
        case CREATE_ORGANIZATION: return state;
        case ORGANIZATIONS_QUERY: return selectMany(state, action.payload) as OrganizationState;
        case ORGANIZATIONS_FETCH:
            const organizations: Organization[] = action.payload;
            const organizationsId = getIds(organizations);
            const newState = addMany(state, organizations) as OrganizationState;

            return {
                ...newState,
                organizationsId: organizationsId,
                loadingList: false
            };
        case ORGANIZATIONS_FETCH_ERROR: return setErrorForMany(state, action.payload.query, action.payload.error) as OrganizationState;
        case ORGANIZATION_QUERY_ONE: return selectOne(state, action.payload) as OrganizationState;
        case ORGANIZATION_FETCH_ONE: return addOne(state, action.payload, false) as OrganizationState;
        case ORGANIZATION_FETCH_ONE_ERROR: const { id, msg } = action.payload;
            return setErrorForOne(state, id, msg) as OrganizationState;
        default:
            return state;
    }
}