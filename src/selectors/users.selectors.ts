import { createSelector } from "reselect";
import { usersStateSelector } from "./app.selectors";

export const usersByIdSelector = createSelector([usersStateSelector], (usersState) => usersState.byId);
export const usersIdSelector = createSelector([usersStateSelector], (usersState) => usersState.usersId);


export const usersQuerySelector = createSelector([usersStateSelector], (usersState) => usersState.query);
export const userSelectedIdSelector = createSelector([usersStateSelector], (usersState) => usersState.selectedId);

export const usersLoadingListSelector = createSelector([usersStateSelector], (usersState) => usersState.loadingList);
export const usersLoadingListErrorSelector = createSelector([usersStateSelector], (usersState) => usersState.loadingListErrorMessage);
export const userLoadingOneSelector = createSelector([usersStateSelector], (usersState) => usersState.loadingOne);
export const userLoadingOneErrorSelector = createSelector([usersStateSelector], (usersState) => usersState.loadingOneErrorMessage);

export const selectedUserSelector = createSelector([usersByIdSelector, userSelectedIdSelector], (byId, selectedId) => selectedId && byId[selectedId]);

export const usersFetchSelector = createSelector([
    usersByIdSelector, usersIdSelector
], (byId, usersId) => {
    const users = usersId.map((id: number) => byId[id]);
    return users;
});