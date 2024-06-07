import { CreateOrganizationFormData, Organization } from "../Models/Organization";
import { CREATE_ORGANIZATION, JOIN_ORGANIZATION, ORGANIZATIONS_FETCH, ORGANIZATIONS_FETCH_ERROR, ORGANIZATIONS_QUERY, ORGANIZATION_FETCH_ONE, ORGANIZATION_FETCH_ONE_ERROR, ORGANIZATION_QUERY_ONE } from "./actions.constants";


export const createOrganizationAction = (o: CreateOrganizationFormData) => ({ type: CREATE_ORGANIZATION, payload: o });
export const joinOrganizationAction = (data: { organizationId: number, roleId: number }) => ({ type: JOIN_ORGANIZATION, payload: data });

export const organizationsQueryAction = (query: string) => ({ type: ORGANIZATIONS_QUERY, payload: query });
export const organizationsFetchAction = (organizations: Organization[]) => ({ type: ORGANIZATIONS_FETCH, payload: organizations });
export const organizationsFetchErrorAction = (query: string, error: string) => ({ type: ORGANIZATIONS_FETCH_ERROR, payload: { query, error } });

export const organizationQueryOneAction = (id: number) => ({ type: ORGANIZATION_QUERY_ONE, payload: id });
export const organizationFetchOneAction = (o: Organization) => ({ type: ORGANIZATION_FETCH_ONE, payload: o });
export const organizationFetchOneErrorAction = (id: number, msg: string) => ({ type: ORGANIZATION_FETCH_ONE_ERROR, payload: { id, msg } });