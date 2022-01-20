import { Entity } from "./Entity";

export interface CreateClassFormData {
    name: string;
}

export interface Class extends Entity, CreateClassFormData {
}