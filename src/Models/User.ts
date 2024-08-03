import { Entity } from "./Entity";

export interface UserData {
    id?: number;
    firstName: string;
    middleName?: string;
    lastName: string;
    birthDate: number;
    gender: Gender;
    phoneNumber: number;
    profilePicUrl?: string;
}

export interface Role {
    id?: number;
    name: string;
}

export enum Gender {
    MALE = "MALE",
    FEMALE = "FEMALE",
    OTHER = "OTHER"
}

export interface User extends Entity {
    email: string;
    username: string;
    password: string;
    roles?: Role[];
    userData?: UserData;
}