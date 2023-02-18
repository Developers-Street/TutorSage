import { useEffect } from "react";
import { FC, memo } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import Avatar from "../../../sharedComponents/Avatar";
import LinkTo from "../../../components/LinkTo";
import Spinner from "../../../sharedComponents/Spinner";
import { useAppSelector } from "../../../store";
import { organizationLoadingOneErrorSelector, organizationLoadingOneSelector, selectedOrganizationSelector } from "../../../selectors/organization.selectors";
import { joinOrganizationAction, organizationQueryOneAction } from "../../../actions/organization.actions";
import UserCard from "../../../components/UserCard";
import { Organization, UserOrganizationRole } from "../../../Models/Organization";
import { User } from "../../../Models/User";
import { Course } from "../../../Models/Course";
import CourseCard from "../../../components/CourseCard";
import Button from "../../../sharedComponents/Button";
import { meSelector } from "../../../selectors/auth.selectors";
import { isStudent } from "../../../utility/me";
import { Me } from "../../../Models/Me";

interface Props { }

const OrganizationDetails: FC<Props> = (props) => {

    const organizationId = +useParams<{ id: string }>().id;

    const o: Organization = useAppSelector(selectedOrganizationSelector);
    const organizationAdmin: User = o && o.admin;
    const me: Me = useAppSelector(meSelector);
    const loading = useAppSelector(organizationLoadingOneSelector);
    const error = useAppSelector(organizationLoadingOneErrorSelector);

    const isAdmin = (o && o.admin.id) === (me && me.id);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(organizationQueryOneAction(organizationId));
    }, [organizationId]); //eslint-disable-line react-hooks/exhaustive-deps

    const joinOrganization = () => {
        let roleId;
        if (isStudent(me)) roleId = 2;
        else roleId = 1;
        dispatch(joinOrganizationAction({ organizationId, roleId }));
    }

    if (!o && !loading) {
        return <div>
            {error}
        </div>
    }

    return (
        <div className="mx-auto">
            {loading && <Spinner type="button" />}
            {o && <div className="mx-10 my-4">
                <div className="flex flex-row space-x-4">
                    <Avatar imgSrc={o.logoUrl} missingImageLetter={o.name[0]} showStatus={false} avatarSize="xl"></Avatar>
                    <div className="w-full flex flex-col space-y-2">
                        <div className="flex flex-col">
                            <div className="flex flex-row justify-between">
                                <h1 className="font-extrabold text-2xl">{o.name}</h1>
                                {o.joinEnable && <Button onClick={joinOrganization} text="Join Organization" theme="success" className="px-2" buttonSize="sm" ></Button>}
                            </div>
                            <span className="text-xs">{o.email}</span>
                        </div>
                    </div>
                </div>
                <div className="mt-6">
                    <div className="flex flex-row justify-between">
                        <h2 className="font-bold text-lg">Courses:</h2>
                        {isAdmin && <LinkTo to={`/organization/${o.id}/course/create`}>Create Course</LinkTo>}
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 max-h-72 pr-4 overflow-y-auto">
                        {o.courses.map((c: Course, index: number) => {
                            return <CourseCard key={index} cId={c.id} oId={o.id} name={c.name} headTutor={c.headTutor.username}></CourseCard>
                        })}
                        {o.courses.length === 0 && <span>No courses added yet</span>}
                    </div>
                </div>
                <div className="mt-6">
                    <h2 className="font-bold text-lg">Team:</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 max-h-72 pr-4 overflow-y-auto">
                        <UserCard imgSrc={organizationAdmin.userData.profilePicUrl} uId={organizationAdmin.id} name={organizationAdmin.username} position={"ROLE_ORGANIZATION_ADMIN"} ></UserCard>
                        {o.userOrganizationRoles && o.userOrganizationRoles.map((uor: UserOrganizationRole, index: number) => {
                            return <UserCard key={index} imgSrc={uor.profile_pic_url} uId={uor.userId} name={uor.username} position={uor.role}></UserCard>
                        })}
                    </div>
                </div>
                <div className="mt-6">
                    <h2 className="font-bold text-lg">Students:</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 max-h-72 pr-4 overflow-y-auto">
                        {o.students.map((student: User, index: number) => {
                            return <UserCard key={index} imgSrc={student.userData.profilePicUrl || ""} name={student.username} position={"ROLE_STUDENT"} uId={student.id}></UserCard>
                        })}
                    </div>
                    {o.students.length === 0 && <span>No students have joined the organization yet.</span>}
                </div>
            </div>}
        </div>
    );
};

OrganizationDetails.defaultProps = {};

export default memo(OrganizationDetails);