import axios from "axios";
// import { Me, MeChangeAble } from "../Models/Me";
import { BASE_URL, LS_AUTH_TOKEN, LS_REFRESH_TOKEN } from "../Constants/constants";
import { axiosRequest, axiosResponse } from "../Axios/axios";
import qs from 'qs';
import { Me } from "../Models/Me";

axiosRequest();
axiosResponse();

interface LoginRequest {
    // email: string;
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

export const login = (data: LoginRequest) => {
    const url = BASE_URL + "/login";
    console.log(data);

    return axios.post<LoginResponse>(url, qs.stringify(data)).then((response) => {
        console.log(response.data.access_token);
        localStorage.setItem(LS_AUTH_TOKEN, response.data.access_token);
        localStorage.setItem(LS_REFRESH_TOKEN, response.data.refresh_token);
        return response.data.user;
    });
};

export const logout = () => {
    localStorage.removeItem(LS_AUTH_TOKEN);
    localStorage.removeItem(LS_REFRESH_TOKEN);
}

interface MeResponse {
    data: Me;
}

export const me = () => {
    const url = BASE_URL + "/me";
    return axios.get<MeResponse>(url);
};

// export const updateMe = (data: MeChangeAble) => {
//     try {
//         const update = axios.put(`${BASE_URL}/me`, data);
//         return update;
//     } catch (error) {
//         console.log("Not able to patch the information!");
//     }
// };