import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { Routes, Route } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getCurrentUser } from '../redux/auth/authOperations';
import { PublicRoute } from './Routes';
import { PrivateRoute } from './Routes/PrivateRoute';
import { useSelector } from 'react-redux';
import LinearProgress from '@mui/material/LinearProgress';
import { lazy, Suspense } from 'react';

const HomePage = lazy(() => import('../pages/HomePage/'));
const LoginPage = lazy(() => import('../pages/LoginPage'));
const RegisterPage = lazy(() => import('../pages/RegisterPage'));
const ContactsPage = lazy(() => import('../pages/ContactsPage'));

export const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCurrentUser());
  }, [dispatch]);

  const isLoadingCurrentUser = useSelector(
    state => state.auth.isLoadingCurrentUser
  );

  if (isLoadingCurrentUser) return <LinearProgress />;

  return (
    <>
      <Suspense fallback={<LinearProgress />}>
        <Routes>
          <Route path="/" element={<HomePage />}>
            <Route
              index
              element={
                <PublicRoute redirectTo="/contacts">
                  <LoginPage />
                </PublicRoute>
              }
            />
            <Route
              path="registration"
              element={
                <PublicRoute redirectTo="/contacts">
                  <RegisterPage />
                </PublicRoute>
              }
            />
          </Route>
          <Route
            path="/contacts"
            element={
              <PrivateRoute>
                <ContactsPage />
              </PrivateRoute>
            }
          />
          <Route path="*" element={<h1>Not found</h1>} />
        </Routes>

        <ToastContainer
          position="top-center"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
      </Suspense>
    </>
  );
};
