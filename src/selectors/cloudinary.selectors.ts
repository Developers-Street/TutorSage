import { cloudinaryStateSelector } from "./app.selectors";
import { createSelector } from "reselect";

export const uploadedProfilePicUrlSelector = createSelector([cloudinaryStateSelector], (cloudinaryState) => cloudinaryState.uploadedProfilePicUrl);
export const uploadedOrganizationLogoUrlSelector = createSelector([cloudinaryStateSelector], (cloudinaryState) => cloudinaryState.uploadedOrganizationLogoUrl);