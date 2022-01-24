import { TypedUseSelectorHook, useSelector } from "react-redux";
import { createStore, combineReducers, applyMiddleware } from "redux";
import { authReducer } from "./reducers/auth.reducer";
import { pathReducer } from "./reducers/path.reducer";
import { composeWithDevTools } from "redux-devtools-extension";
import { sagaMiddleware } from "./sagas";
import { usersReducer } from "./reducers/users.reducer";
import { watchUserActions } from "./sagas/users.saga";
import { watchMeAuth } from "./sagas/auth.sagas";
import { classReducer } from "./reducers/class.reducer";
import { watchClassActions } from "./sagas/class.sagas";
import { cloudinaryReducer } from "./reducers/cloudinary.reducer";
import { watchCloudinaryUpload } from "./sagas/cloudinary.sagas";

const reducer = combineReducers({
    users: usersReducer,
    auth: authReducer,
    class: classReducer,
    path: pathReducer,
    cloudinary: cloudinaryReducer,
});

export const store = createStore(
    reducer,
    composeWithDevTools(applyMiddleware(
        sagaMiddleware
    ))
);

sagaMiddleware.run(watchClassActions);
sagaMiddleware.run(watchUserActions);
sagaMiddleware.run(watchMeAuth);
sagaMiddleware.run(watchCloudinaryUpload);

export type AppState = ReturnType<typeof store.getState>;

export const useAppSelector: TypedUseSelectorHook<AppState> = useSelector;