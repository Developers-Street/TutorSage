import { createSelector } from "reselect";
import { myOrganizationStateSelector, organizationStateSelector } from "./app.selectors";

export const organizationsByIdSelector = createSelector([organizationStateSelector], (organizationState) => organizationState.byId);
export const organizationsIdSelector = createSelector([organizationStateSelector], (organizationState) => organizationState.organizationsId);

export const organizationsQuerySelector = createSelector([organizationStateSelector], (organizationState) => organizationState.query);
export const organizationSelectedIdSelector = createSelector([organizationStateSelector], (organizationState) => organizationState.selectedId);

export const organizationsLoadingListSelector = createSelector([organizationStateSelector], (organizationState) => organizationState.loadingList);
export const organizationsLoadingListErrorSelector = createSelector([organizationStateSelector], (organizationState) => organizationState.loadingListErrorMessage);
export const organizationLoadingOneSelector = createSelector([organizationStateSelector], (organizationState) => organizationState.loadingOne);
export const organizationLoadingOneErrorSelector = createSelector([organizationStateSelector], (organizationState) => organizationState.loadingOneErrorMessage);

export const selectedorganizationSelector = createSelector([organizationsByIdSelector, organizationSelectedIdSelector], (byId, selectedId) => selectedId && byId[selectedId]);

export const organizationsFetchSelector = createSelector([
    organizationsByIdSelector, organizationsIdSelector
], (byId, organizationsId) => {
    const organizations = organizationsId.map((id: number) => byId[id]);
    return organizations;
});



//my organizations

export const myOrganizationByIdSelector = createSelector([myOrganizationStateSelector], (myOrganizationState) => myOrganizationState.byId);
export const myOrganizationsIdSelector = createSelector([myOrganizationStateSelector], (myOrganizationState) => myOrganizationState.myOrganizationsId);

export const myOrganizationsLoadingListSelector = createSelector([myOrganizationStateSelector], (myOrganizationState) => myOrganizationState.loadingList);
export const myOrganizationsLoadingListErrorSelector = createSelector([myOrganizationStateSelector], (myOrganizationState) => myOrganizationState.loadingListErrorMessage);

export const myOrganizationsFetchSelector = createSelector([
    myOrganizationByIdSelector, myOrganizationsIdSelector
], (byId, myOrganizationsId) => {
    const myOrganizations = myOrganizationsId.map((id: number) => byId[id]);
    return myOrganizations;
})