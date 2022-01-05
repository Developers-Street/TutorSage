import { authStateSelector } from "./app.selectors";
import { createSelector } from "reselect";

export const authIdSelector = createSelector([authStateSelector], (authState) => authState.id);
export const authByIdSelector = createSelector([authStateSelector], (authState) => authState.byId);

export const meSelector = createSelector([authByIdSelector, authIdSelector], (byId, id) => id && byId[id]);

export const errorMessageSelector = createSelector([authStateSelector], (authState) => authState.errorMessage);
export const isFormSubmittingSelector = createSelector([authStateSelector], (authState) => authState.isFormSubmitting);