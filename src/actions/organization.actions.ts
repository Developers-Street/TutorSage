import { CreateOrganizationFormData, Organization } from "../Models/Organization";
import { CREATE_ORGANIZATION, JOIN_ORGANIZATION, JOIN_ORGANIZATION_AS_STUDENT, ORGANIZATIONS_FETCH, ORGANIZATIONS_FETCH_ERROR, ORGANIZATIONS_QUERY, ORGANIZATION_FETCH_ONE, ORGANIZATION_FETCH_ONE_ERROR, ORGANIZATION_QUERY_ONE } from "./actions.constants";


export const createOrganizationAction = (c: CreateOrganizationFormData) => ({ type: CREATE_ORGANIZATION, payload: c });
export const joinOrganizationAction = (data: { organizationId: number }) => ({ type: JOIN_ORGANIZATION, payload: data });
export const joinOrganizationAsStudentAction = (data: { classId: number }) => ({ type: JOIN_ORGANIZATION_AS_STUDENT, payload: data });

export const organizationsQueryAction = (query: string) => ({ type: ORGANIZATIONS_QUERY, payload: query });
export const organizationsFetchAction = (classes: Organization[]) => ({ type: ORGANIZATIONS_FETCH, payload: classes });
export const organizationsFetchErrorAction = (query: string, error: string) => ({ type: ORGANIZATIONS_FETCH_ERROR, payload: { query, error } });

export const organizationQueryOneAction = (id: number) => ({ type: ORGANIZATION_QUERY_ONE, payload: id });
export const organizationFetchOneAction = (c: Organization) => ({ type: ORGANIZATION_FETCH_ONE, payload: c });
export const organizationFetchOneErrorAction = (id: number, msg: string) => ({ type: ORGANIZATION_FETCH_ONE_ERROR, payload: { id, msg } });