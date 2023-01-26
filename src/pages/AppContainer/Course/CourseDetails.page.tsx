import { FC, memo } from "react";

interface Props { }

const CourseDetails: FC<Props> = ({ }) => {
    return (
        <div className="mx-auto">
            course details page
        </div>
    );
};

CourseDetails.defaultProps = {};

export default memo(CourseDetails);