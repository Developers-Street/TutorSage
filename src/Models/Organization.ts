import { Course } from "./Course";
import { User } from "./User";

export interface CreateOrganizationFormData {
    name: string;
    email: string;
    desciption: string;
    type: OrganizationType;
    logoUrl: string;
}

export interface Organization {
    id: number;
    name: string;
    email: string;
    creator: User;
    logoUrl: string;
    description: string;
    type: OrganizationType;
    admin: User;
    joinEnable: boolean;
    courses: Course[];
    students: User[];
    userOrganizationRoles: UserOrganizationRole[]
}

export interface UserOrganizationRole {
    userId: number;
    username: string;
    role: string;
    profile_pic_url: string;
}

export enum OrganizationType {
    school = "school",
    college = "college",
    coaching = "coaching"
}