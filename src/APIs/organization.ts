import axios from "axios";
import { BASE_URL } from "../Constants/constants";
import { axiosRequest, axiosResponse } from "../Axios/axios";
import { CreateOrganizationFormData, Organization } from "../Models/Organization";

axiosRequest();
axiosResponse();

interface OrganizationResponse {
    data: Organization[];
}

export const createOrganizationAPI = async (data: CreateOrganizationFormData) => {
    const url = BASE_URL + "/organization/create";

    return await axios.post<any>(url, data);
}

export const joinOrganizationAPI = async (data: { classId: number }) => {
    const url = BASE_URL + "/organization/join";

    return await axios.post<any>(url, data);
}

export const joinOrganizationAsStudentAPI = async (data: { organizationId: number }) => {
    const url = BASE_URL + "/organization/student/join";

    return await axios.post<any>(url, data);
}

export const fetchOrganizationsAPI = async (query: string) => {
    const url = BASE_URL + "/organization/";

    return await axios.get<OrganizationResponse>(url, { params: { query: query, offset: 1, limit: 20 } });
}

export const fetchOneOrganizationAPI = async (id: string) => {
    const url = BASE_URL + "/organization/" + id;

    return await axios.get<OrganizationResponse>(url);
}

export const fetchMyOrganizationAPI = async (id: string) => {
    const url = BASE_URL + "/organization/me";

    return await axios.get<OrganizationResponse>(url);
}