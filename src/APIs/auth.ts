import axios from "axios";
import { BASE_URL, LS_AUTH_TOKEN, LS_REFRESH_TOKEN } from "../Constants/constants";
import { axiosRequest, axiosResponse } from "../Axios/axios";
import qs from 'qs';
import { Me, MeData } from "../Models/Me";

axiosRequest();
axiosResponse();

interface LoginRequest {
    username: string;
    password: string;
}

interface LoginResponse {
    data: {
        is_2fa_enabled: boolean;
    };
    access_token: string;
    refresh_token: string;
    user: Me;
}

interface SignupRequest {
    email: string;
    username: string;
    password: string;
    role: string;
}


export const signup = async (data: SignupRequest) => {
    const url = BASE_URL + "/auth/signup";

    return await axios.post<LoginResponse>(url, data);
}

export const saveRoleToUser = async (data: SignupRequest) => {
    const url = BASE_URL + "/auth/role/save";

    return await axios.post<any>(url, { username: data.username, role: data.role });
}

export const login = async (data: LoginRequest) => {
    const url = BASE_URL + "/auth/login";

    return await axios.post<LoginResponse>(url, qs.stringify(data));
};

export const logout = () => {
    localStorage.removeItem(LS_AUTH_TOKEN);
    localStorage.removeItem(LS_REFRESH_TOKEN);
}

export const saveData = async (data: MeData) => {
    const url = BASE_URL + "/me/data/save";

    return await axios.post<MeResponse>(url, data);
}

interface MeResponse {
    data: Me;
}

export const me = async () => {
    const url = BASE_URL + "/me/";
    return await axios.get<MeResponse>(url);
};

export const updateMe = async (data: MeData) => {

    const url = BASE_URL + "/me/profile/update";

    return await axios.post(url, data);
};