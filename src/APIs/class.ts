import axios from "axios";
import { BASE_URL} from "../Constants/constants";
import { axiosRequest, axiosResponse } from "../Axios/axios";
import { Class, CreateClassFormData } from "../Models/Class";

axiosRequest();
axiosResponse();

interface ClassResponse {
    data: Class[];
}

export const createClassAPI = async (data: CreateClassFormData) => {
    const url = BASE_URL + "/class/create";

    return await axios.post<any>(url, data);
}

export const joinClassAPI = async (data: {classId: number}) => {
    const url = BASE_URL + "/class/join";

    return await axios.post<any>(url, data);
}

export const fetchClassesAPI = async (query: string) => {
    const url = BASE_URL + "/class/";

    return await axios.get<ClassResponse>(url, {params: {query: query, offset: 1, limit: 20}});
}

export const fetchOneClassAPI = async (id: string) => {
    const url = BASE_URL + "/class/" + id;

    return await axios.get<ClassResponse>(url);
}