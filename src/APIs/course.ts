import axios from "axios";
import { BASE_URL } from "../Constants/constants";
import { axiosRequest, axiosResponse } from "../Axios/axios";
import { Course, CreateCourseFormData } from "../Models/Course";

axiosRequest();
axiosResponse();

interface CourseResponse {
    data: Course[];
}

export const createCourseInOrganizationAPI = async (data: CreateCourseFormData, organizationId: number) => {
    const url = BASE_URL + "/organization/" + organizationId.toString() + "/course/create";

    return await axios.post<any>(url, data);
}

// export const joinCourseAPI = async (data: { classId: number }) => {
//     const url = BASE_URL + "/course/join";

//     return await axios.post<any>(url, data);
// }

export const fetchCoursesAPI = async (query: string) => {
    const url = BASE_URL + "/course/";

    return await axios.get<CourseResponse>(url, { params: { query: query, offset: 1, limit: 20 } });
}

export const fetchOneCourseAPI = async (id: string) => {
    const url = BASE_URL + "/course/" + id;

    return await axios.get<CourseResponse>(url);
}