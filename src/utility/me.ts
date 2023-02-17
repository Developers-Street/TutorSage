import { Me } from "../Models/Me";

export const isStudent = (me: Me) => {
    let student: boolean = false;
    if (me.roles) {
        me.roles.map((role) => {
            if (role.name === "ROLE_STUDENT") student = true;
            return true;
        })
    }
    return student;
}