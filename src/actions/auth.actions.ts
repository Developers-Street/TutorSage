// import { Me, MeChangeAble } from "../Models/Me";
import { Me, MeData} from "../Models/Me";
import { ME_AUTH_CHECK, ME_FETCH, ME_LOGIN, ME_SAVE_DATA, ME_SIGNUP, ME_UPDATE } from "./actions.constants";

export const meFetchAction = (u: Me) => ({ type: ME_FETCH, payload: u });
export const meSignupAction = (data: {username: string, password: string}) => ({type: ME_SIGNUP, payload: data});
export const meLoginAction = (data: { username: string, password: string }) => ({ type: ME_LOGIN, payload: data });
export const meAuthCheckAction = () => ({ type: ME_AUTH_CHECK });
export const meSaveDetailsAction = (data: MeData) => ({type: ME_SAVE_DATA, payload: data});
// export const meUpdateAction = (data: MeChangeAble) => ({ type: ME_UPDATE, payload: data });