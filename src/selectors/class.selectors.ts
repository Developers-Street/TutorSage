import { createSelector } from "reselect";
import { classStateSelector } from "./app.selectors";

export const classesByIdSelector = createSelector([classStateSelector], (classState) => classState.byId);
export const classesIdSelector = createSelector([classStateSelector], (classState) => classState.classesId);

export const classesQuerySelector = createSelector([classStateSelector], (classState) => classState.query);
export const classSelectedIdSelector = createSelector([classStateSelector], (classState) => classState.selectedId);

export const classesLoadingListSelector = createSelector([classStateSelector], (classState) => classState.loadingList);
export const classesLoadingListErrorSelector = createSelector([classStateSelector], (classState) => classState.loadingListErrorMessage);
export const classLoadingOneSelector = createSelector([classStateSelector], (classState) => classState.loadingOne);
export const classLoadingOneErrorSelector = createSelector([classStateSelector], (classState) => classState.loadingOneErrorMessage);

export const selectedClassSelector = createSelector([classesByIdSelector, classSelectedIdSelector], (byId, selectedId) => selectedId && byId[selectedId]);

export const classesFetchSelector = createSelector([
    classesByIdSelector, classesIdSelector
], (byId, classesId) => {
    const classes = classesId.map((id) => byId[id]);
    return classes;
});