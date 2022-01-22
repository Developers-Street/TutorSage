import { FC, Suspense, useEffect } from 'react';
import { Redirect, Route, BrowserRouter, Switch } from 'react-router-dom';
import { LS_AUTH_TOKEN } from './Constants/constants';
import AppContainerLazy from './pages/AppContainer/AppContainer.lazy';
import AuthLazy from './pages/Auth/Auth.lazy';
import NotFoundPage from './pages/NotFound.page';
import { useAppSelector } from './store';
import { meSelector } from './selectors/auth.selectors';
import Spinner from './sharedComponents/Spinner/Spinner';
import { useDispatch } from 'react-redux';
import { meAuthCheckAction } from './actions/auth.actions';
import RegisterDetailsPage from './pages/Auth/RegisterDetails.page';

interface Props { }

const App: FC<Props> = () => {

  const user = useAppSelector(meSelector);

  const token = localStorage.getItem(LS_AUTH_TOKEN);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!token) return;

    dispatch(meAuthCheckAction());
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  if (!user && token) {
    return <Spinner />
  }

  return (
    <Suspense fallback={<Spinner />}>
      <BrowserRouter>
        <Switch>
          <Route path="/" exact>
            {user ? <Redirect to="/dashboard" /> : <Redirect to="/login"></Redirect>}
          </Route>
          <Route path={["/login", "/signup"]} exact>
            {user ? <Redirect to="/dashboard" /> : <AuthLazy />}
          </Route>
          <Route path="/register">
            {user ? ( user.userData ? <Redirect to = "/dashboard" /> : <RegisterDetailsPage /> ): <Redirect to="/login" />}
          </Route>
          <Route path={["/dashboard", "/me", "/profile", "/users", "/class"]}>
            {user ? (user.userData ? <AppContainerLazy /> : <Redirect to = "/register" />) : <Redirect to="/login" />}
          </Route>
          <Route>
            <NotFoundPage />
          </Route>
        </Switch>
      </BrowserRouter>
    </Suspense>
  );
}

export default App;