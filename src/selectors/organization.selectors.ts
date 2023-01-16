import { createSelector } from "reselect";
import { organizationStateSelector } from "./app.selectors";

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
    console.log(organizations);
    return organizations;
});