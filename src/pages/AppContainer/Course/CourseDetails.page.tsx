import { FC, memo } from "react";

interface Props {
    className?: String;
}

const CourseDetails: FC<Props> = ({ className }) => {
    return (
        <div className="mx-auto">
            course details page
        </div>
    );
};

CourseDetails.defaultProps = {};

export default memo(CourseDetails);