import { AppState } from "../store";

export const authStateSelector = (state: AppState) => state.auth;
export const pathStateSelector = (state: AppState) => state.path;
export const usersStateSelector = (state: AppState) => state.users;
export const organizationStateSelector = (state: AppState) => state.organization;
export const classStateSelector = (state: AppState) => state.class;
export const cloudinaryStateSelector = (state: AppState) => state.cloudinary;