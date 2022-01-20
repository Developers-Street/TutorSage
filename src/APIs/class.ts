import axios from "axios";
// import { Me, MeChangeAble } from "../Models/Me";
import { BASE_URL, LS_AUTH_TOKEN, LS_REFRESH_TOKEN } from "../Constants/constants";
import { axiosRequest, axiosResponse } from "../Axios/axios";
import qs from 'qs';
import { Me, MeData } from "../Models/Me";
import { CreateClassFormData } from "../Models/Class";

axiosRequest();
axiosResponse();


export const createClassAPI = async (data: CreateClassFormData) => {
    const url = BASE_URL + "/class/create";

    return await axios.post<any>(url, data);
}