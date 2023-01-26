import { User } from "./User";

export interface CreateCourseFormData {
    name: string;
}
export interface Course {
    id: number;
    name: string;
    creator: User;
    headTutor: User;
    students: User[];
    visibility: OrganizationVisibilityType;
    subjects: Subject[];
}

export enum OrganizationVisibilityType {
    ORGANIZATION = "ORGANIZATION",
    PUBLIC = "PUBLIC"
}

export interface Subject {
    id: number;
    name: string;
    tutor: User;
}