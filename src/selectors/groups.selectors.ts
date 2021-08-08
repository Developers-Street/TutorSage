import { groupStateSelector } from "./app.selectors";
import { createSelector } from 'reselect';


export const groupQuerySelector = createSelector([groupStateSelector], (groupState) => groupState.query);
export const groupQueryMapSelector = createSelector([groupStateSelector], (groupState) => groupState.queryMap);
export const groupByIdSelector = createSelector([groupStateSelector], (groupState) => groupState.byId);

export const groupsFetchSelector = createSelector([
    groupQuerySelector,
    groupQueryMapSelector,
    groupByIdSelector
], (query, queryMap, byId) => {
    const groupIds = queryMap[query] || [];
    const groups = groupIds.map((id) => byId[id]);
    return groups;
});