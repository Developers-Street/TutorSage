import { Organization } from "../Models/Organization";
import { MY_ORGANIZATIONS_FETCH, MY_ORGANIZATIONS_FETCH_ERROR, MY_ORGANIZATIONS_QUERY } from "./actions.constants";

export const myOrganizationsQueryAction = () => ({ type: MY_ORGANIZATIONS_QUERY, payload: {} });
export const myOrganizationsFetchAction = (myOrganizations: Organization[]) => ({ type: MY_ORGANIZATIONS_FETCH, payload: myOrganizations });
export const myOrganizationsFetchErrorAction = (query: string, error: string) => ({ type: MY_ORGANIZATIONS_FETCH_ERROR, payload: { query, error } });