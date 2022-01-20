import { CreateClassFormData } from "../Models/Class";
import { CREATE_CLASS, JOIN_CLASS } from "./actions.constants";

export const createClassAction = (c: CreateClassFormData) => ({type: CREATE_CLASS, payload: c});
export const joinClassAction = (data: {classId: number}) => ({type: JOIN_CLASS, payload: data});