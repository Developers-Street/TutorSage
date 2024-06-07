import axios from "axios";
import { axiosRequest, axiosResponse, get } from "../Axios/axios";
import { BASE_URL } from "../Constants/constants";
import { User } from "../Models/User";


axiosRequest();
axiosResponse();

//export interface UserRequest {}

interface UserResponse {
    data: User[];
}

export const fetchUsers = async (query: string) => {
    const url = BASE_URL + "/users/";

    return await get<UserResponse>(url, {params: {query: query, offset: 1, limit: 20}});
}

export const fetchOneUser = async (id: string) => {
    const url = BASE_URL + "/users/" + id;

    return await axios.get<UserResponse>(url);
}