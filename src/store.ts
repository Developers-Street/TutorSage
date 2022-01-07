import { TypedUseSelectorHook, useSelector } from "react-redux";
import { createStore, combineReducers, applyMiddleware } from "redux";
import { authReducer } from "./reducers/auth.reducer";
import { pathReducer } from "./reducers/path.reducer";
import { composeWithDevTools } from "redux-devtools-extension";
import { sagaMiddleware } from "./sagas";
import { usersReducer } from "./reducers/users.reducer";
import { watchUserQueryChanged } from "./sagas/users.saga";
import { watchMeAuth } from "./sagas/auth.sagas";

const reducer = combineReducers({
    users: usersReducer,
    auth: authReducer,
    path: pathReducer
});

export const store = createStore(
    reducer,
    composeWithDevTools(applyMiddleware(
        sagaMiddleware
    ))
);

sagaMiddleware.run(watchUserQueryChanged);
sagaMiddleware.run(watchMeAuth);

export type AppState = ReturnType<typeof store.getState>;

export const useAppSelector: TypedUseSelectorHook<AppState> = useSelector;