import { createSelector } from "reselect";
import { classStateSelector, usersStateSelector } from "./app.selectors";

export const classByIdSelector = createSelector([classStateSelector], (classState) => classState.byId);