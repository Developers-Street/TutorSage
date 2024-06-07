import { TypedUseSelectorHook, useSelector } from "react-redux";
import { createStore, combineReducers, applyMiddleware } from "redux";
import { authReducer } from "./reducers/auth.reducer";
import { pathReducer } from "./reducers/path.reducer";
import { composeWithDevTools } from "redux-devtools-extension";
import { sagaMiddleware } from "./sagas";
import { usersReducer } from "./reducers/users.reducer";
import { watchUserActions } from "./sagas/users.saga";
import { watchMeAuth } from "./sagas/auth.sagas";
import { cloudinaryReducer } from "./reducers/cloudinary.reducer";
import { watchCloudinaryUpload } from "./sagas/cloudinary.sagas";
import { organizationReducer } from "./reducers/organization.reducer";
import { watchOrganizationActions } from "./sagas/organization.sagas";
import { myOrganizationReducer } from "./reducers/myOrganizations.reducer";
import { courseReducer } from "./reducers/course.reducer";
import { watchCourseActions } from "./sagas/course.sagas";

const reducer = combineReducers({
    users: usersReducer,
    auth: authReducer,
    organization: organizationReducer,
    myOrganizations: myOrganizationReducer,
    course: courseReducer,
    path: pathReducer,
    cloudinary: cloudinaryReducer,
});

export const store: any = createStore(
    reducer,
    composeWithDevTools(applyMiddleware(
        sagaMiddleware
    ))
);

sagaMiddleware.run(watchOrganizationActions);
sagaMiddleware.run(watchUserActions);
sagaMiddleware.run(watchMeAuth);
sagaMiddleware.run(watchCloudinaryUpload);
sagaMiddleware.run(watchCourseActions);

export type AppState = ReturnType<typeof store.getState>;

export const useAppSelector: TypedUseSelectorHook<AppState> = useSelector;