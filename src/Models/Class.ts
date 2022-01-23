import { Entity } from "./Entity";
import { User } from "./User";

export interface CreateClassFormData {
    name: string;
}

export interface Class extends Entity, CreateClassFormData {
    creator: User,
    members: User[]
}