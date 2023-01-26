import { useEffect } from "react";
import { FC, memo } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import Avatar from "../../../sharedComponents/Avatar";
import LinkTo from "../../../components/LinkTo";
import Spinner from "../../../sharedComponents/Spinner";
import { useAppSelector } from "../../../store";
import { organizationLoadingOneErrorSelector, organizationLoadingOneSelector, selectedorganizationSelector } from "../../../selectors/organization.selectors";
import { organizationQueryOneAction } from "../../../actions/organization.actions";
import UserCard from "../../../components/UserCard";
import { UserOrganizationRole } from "../../../Models/Organization";
import { User } from "../../../Models/User";
import { Course } from "../../../Models/Course";
import CourseCard from "../../../components/CourseCard";

interface Props { }

const OrganizationDetails: FC<Props> = (props) => {

    const organizationId = +useParams<{ id: string }>().id;

    const o = useAppSelector(selectedorganizationSelector);
    const loading = useAppSelector(organizationLoadingOneSelector);
    const error = useAppSelector(organizationLoadingOneErrorSelector);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(organizationQueryOneAction(organizationId));
    }, [organizationId]); //eslint-disable-line react-hooks/exhaustive-deps

    if (!o && !loading) {
        return <div>
            {error}
            <LinkTo to={`/organization/${organizationId + 1}`}>Next organization</LinkTo>
        </div>
    }

    return (
        <div className="mx-auto">
            {loading && <Spinner type="button" />}
            {o && <div className="mx-10 my-4">
                <div className="flex flex-row space-x-4">
                    <Avatar imgSrc={o.logoUrl} missingImageLetter={o.name[0]} showStatus={false} avatarSize="xl"></Avatar>
                    <div className="flex flex-col space-y-2">
                        <div className="flex flex-col">
                            <h1 className="font-extrabold text-2xl">{o.name}</h1>
                            <span className="text-xs">{o.email}</span>
                        </div>
                    </div>
                </div>
                <div className="mt-6">
                    <h2 className="font-bold text-lg">Courses:</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 max-h-72 pr-4 overflow-y-auto">
                        {o.courses.map((c: Course, index: number) => {
                            return <CourseCard cId={c.id} oId={o.id} name={c.name} headTutor={c.headTutor.username}></CourseCard>
                        })}
                    </div>
                </div>
                <div className="mt-6">
                    <h2 className="font-bold text-lg">Team:</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 max-h-72 pr-4 overflow-y-auto">
                        {o.userOrganizationRoles.map((uor: UserOrganizationRole, index: number) => {
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
                </div>
            </div>}
        </div>
    );
};

OrganizationDetails.defaultProps = {};

export default memo(OrganizationDetails);