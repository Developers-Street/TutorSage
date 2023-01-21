import { Me, MeData } from "../Models/Me";
import { FORM_SUBMITTING_STATUS, ME_AUTH_CHECK, ME_AUTH_ERROR_MESSAGE, ME_FETCH, ME_LOGIN, ME_SAVE_DATA, ME_SET_PROFILE_PIC_URL, ME_SIGNUP, ME_UPDATE } from "./actions.constants";

export const meFetchAction = (u: Me) => ({ type: ME_FETCH, payload: u });
export const meSignupAction = (data: { email: string, username: string, password: string }) => ({ type: ME_SIGNUP, payload: data });
export const meLoginAction = (data: { username: string, password: string }) => ({ type: ME_LOGIN, payload: data });
export const meAuthCheckAction = () => ({ type: ME_AUTH_CHECK });
export const meSetProfilePicUrlAction = (imgUrl: string) => ({ type: ME_SET_PROFILE_PIC_URL, payload: imgUrl });
export const meSaveDetailsAction = (data: MeData) => ({ type: ME_SAVE_DATA, payload: data });
export const meAuthErrorMessageAction = (message: string) => ({ type: ME_AUTH_ERROR_MESSAGE, payload: message });
export const meFormSubmittingStatus = (status: boolean) => ({ type: FORM_SUBMITTING_STATUS, payload: status });
export const meUpdateAction = (data: MeData) => ({ type: ME_UPDATE, payload: data });