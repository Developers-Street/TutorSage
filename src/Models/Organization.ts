import { User } from "./User";

export interface CreateOrganizationFormData {
    name: string;
    email: string;
}

export interface Organization {
    id: number;
    name: string;
    email: string;
    creator: User;
    admin: User;
    students: User[];
}