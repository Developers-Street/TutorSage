import { createSelector } from "reselect";
import { courseStateSelector } from "./app.selectors";

export const coursesByIdSelector = createSelector([courseStateSelector], (courseState) => courseState.byId);
export const coursesIdSelector = createSelector([courseStateSelector], (courseState) => courseState.coursesId);

export const coursesQuerySelector = createSelector([courseStateSelector], (courseState) => courseState.query);
export const courseSelectedIdSelector = createSelector([courseStateSelector], (courseState) => courseState.selectedId);

export const coursesLoadingListSelector = createSelector([courseStateSelector], (courseState) => courseState.loadingList);
export const coursesLoadingListErrorSelector = createSelector([courseStateSelector], (courseState) => courseState.loadingListErrorMessage);
export const courseLoadingOneSelector = createSelector([courseStateSelector], (courseState) => courseState.loadingOne);
export const courseLoadingOneErrorSelector = createSelector([courseStateSelector], (courseState) => courseState.loadingOneErrorMessage);

export const selectedcourseSelector = createSelector([coursesByIdSelector, courseSelectedIdSelector], (byId, selectedId) => selectedId && byId[selectedId]);

export const coursesFetchSelector = createSelector([
    coursesByIdSelector, coursesIdSelector
], (byId, coursesId) => {
    const courses = coursesId.map((id: number) => byId[id]);
    return courses;
});