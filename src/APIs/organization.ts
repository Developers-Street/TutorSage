import axios from "axios";
import { BASE_URL } from "../Constants/constants";
import { axiosRequest, axiosResponse } from "../Axios/axios";
import { CreateOrganizationFormData, Organization } from "../Models/Organization";
import { User } from "../Models/User";

axiosRequest();
axiosResponse();

interface OrganizationResponse {
    data: Organization[];
}

export const createOrganizationAPI = async (data: CreateOrganizationFormData) => {
    const url = BASE_URL + "/organization/create";

    return await axios.post<any>(url, data);
}

export const joinOrganizationAPI = async (data: { organizationId: number, roleId: number }) => {
    const url = BASE_URL + "/organization/" + data.organizationId.toString() + "/join";

    return await axios.post<any>(url, {}, { params: { roleId: data.roleId } });
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
    const url = BASE_URL + "/me/organizations";

    return await axios.get<OrganizationResponse>(url);
}

export const fetchOrganizationTutors = async (data: { organizationId: number, query: string }) => {
    const url = BASE_URL + "/organization/" + data.organizationId.toString() + "/tutors";

    return await axios.get<User[]>(url, { params: { query: data.query } });
}

export const fetchNonAddedStudentsOfOrganization = async (data: { organizationId: number, courseId: number }) => {
    const url = BASE_URL + "/organization/" + data.organizationId.toString() + "/course/" + data.courseId.toString() + "/students/nonAdded";

    return await axios.get<User[]>(url);
}

export const addStudentsToCourse = async (data: { studentIds: number[], organizationId: number, courseId: number }) => {
    const url = BASE_URL + "/organization/" + data.organizationId.toString() + "/course/" + data.courseId.toString() + "/students/add";

    return await axios.post<{ message: string }>(url, data.studentIds);
}