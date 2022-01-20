import axios from "axios";
import { BASE_URL} from "../Constants/constants";
import { axiosRequest, axiosResponse } from "../Axios/axios";
import { CreateClassFormData } from "../Models/Class";

axiosRequest();
axiosResponse();


export const createClassAPI = async (data: CreateClassFormData) => {
    const url = BASE_URL + "/class/create";

    return await axios.post<any>(url, data);
}

export const joinClassAPI = async (data: {classId: number}) => {
    const url = BASE_URL + "/class/join";

    return await axios.post<any>(url, data);
}