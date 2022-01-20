import { CreateClassFormData } from "../Models/Class";
import { CREATE_CLASS } from "./actions.constants";

export const createClassAction = (c: CreateClassFormData) => ({type: CREATE_CLASS, payload: c});