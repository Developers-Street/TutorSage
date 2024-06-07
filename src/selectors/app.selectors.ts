import { AppState } from "../store";

export const authStateSelector = (state: AppState) => state.auth;
export const pathStateSelector = (state: AppState) => state.path;
export const usersStateSelector = (state: AppState) => state.users;
export const organizationStateSelector = (state: AppState) => state.organization;
export const myOrganizationStateSelector = (state: AppState) => state.myOrganizations;
export const courseStateSelector = (state: AppState) => state.course;
export const cloudinaryStateSelector = (state: AppState) => state.cloudinary;