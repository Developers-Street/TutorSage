import { Me } from "../Models/Me";
import { User } from "../Models/User";

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

export const getNameOfTheUser = (user: User) => {
    if (user.userData.middleName && user.userData.middleName !== "")
        return user.userData.firstName + " " + user.userData.middleName + " " + user.userData.lastName;
    return user.userData.firstName + " " + user.userData.lastName;
}