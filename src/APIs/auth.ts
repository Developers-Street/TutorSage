import axios from "axios";
// import { Me, MeChangeAble } from "../Models/Me";
import { BASE_URL, LS_AUTH_TOKEN, LS_REFRESH_TOKEN } from "../Constants/constants";
import { axiosRequest, axiosResponse } from "../Axios/axios";
import qs from 'qs';
import { Me, MeData } from "../Models/Me";

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

interface SignupRequest {
    email: string;
    username: string;
    password: string;
    role: string;
}


export const signup = async (data: SignupRequest) => {
    const url = BASE_URL + "/auth/signup";

    return await axios.post<LoginResponse>(url, data);
    // .then((response) => {
    //     // localStorage.setItem(LS_AUTH_TOKEN, response.data.access_token);
    //     // localStorage.setItem(LS_REFRESH_TOKEN, response.data.refresh_token);
    //     // return response.data.user;
    //     window.location.href = "/login";
    // })
}

export const saveRoleToUser = async (data: SignupRequest) => {
    const url = BASE_URL + "/auth/role/save";

    return await axios.post<any>(url, {username: data.username, role: data.role});
}

export const login = async (data: LoginRequest) => {
    const url = BASE_URL + "/auth/login";
    
    return await axios.post<LoginResponse>(url, qs.stringify(data));
    // .then((response) => {
    //     localStorage.setItem(LS_AUTH_TOKEN, response.data.access_token);
    //     localStorage.setItem(LS_REFRESH_TOKEN, response.data.refresh_token);
    //     return response.data.user;
    // });
};

export const logout = () => {
    localStorage.removeItem(LS_AUTH_TOKEN);
    localStorage.removeItem(LS_REFRESH_TOKEN);
}

export const saveData = async (data: MeData) => {
    const url = BASE_URL + "/me/data/save";

    return await axios.post<MeResponse>(url, data);
    // .then((response) => {
    //     return response.data;
    // })
}

interface MeResponse {
    data: Me;
}

export const me = async () => {
    const url = BASE_URL + "/me/";
    return await axios.get<MeResponse>(url);
};
// export const updateMe = (data: MeChangeAble) => {
//     try {
//         const update = axios.put(`${BASE_URL}/me`, data);
//         return update;
//     } catch (error) {
//         console.log("Not able to patch the information!");
//     }
// };