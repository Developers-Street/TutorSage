import { FC, memo, useEffect } from "react";
import { useDispatch } from "react-redux";
import { pathActions } from "../../../actions/path.actions";
import { classesQueryAction } from "../../../actions/class.actions";
import LinkTo from "../../../components/LinkTo";
import Spinner from "../../../sharedComponents/Spinner";
import { useAppSelector } from "../../../store";
import EditInput from "../../../sharedComponents/EditInput";
import { classesFetchSelector, classesLoadingListErrorSelector, classesLoadingListSelector, classesQuerySelector } from "../../../selectors/class.selectors";
import UserData from "../../../components/UserData";

interface Props { }

const SearchClasses: FC<Props> = (props) => {

    useEffect(() => { pathActions.setPath(window.location.pathname.split("/").splice(1)); })

    const dispatch = useDispatch();

    const classes = useAppSelector(classesFetchSelector);
    const loading = useAppSelector(classesLoadingListSelector);
    const query = useAppSelector(classesQuerySelector);
    const error = useAppSelector(classesLoadingListErrorSelector);

    return (
        <div>
            {loading && <Spinner type="button" />}
            <EditInput value={query} onChange={(e) => {
                dispatch(classesQueryAction((e.target as HTMLInputElement).value))
            }
            }></EditInput>
            {!error && classes.map((c, index) => {
                return (<div key={c.id}>
                    <LinkTo to={`/class/${c.id}`}>
                        <UserData
                            className={`${(index % 2 === 0) ? "bg-white" : "bg-gray-100"}`}
                            name={c.name}
                            // desc={class.bio}
                            imgSrc={""}
                        ></UserData>
                    </LinkTo>
                </div>);
            })}
            <div>{error}</div>
        </div>
    );
};

SearchClasses.defaultProps = {};

export default memo(SearchClasses);