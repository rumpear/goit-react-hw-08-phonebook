import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// import { Section } from './ui/Section';
// import { ContactsFilter } from './ContactsFilter';
// import { ContactsForm } from './ContactsForm';
// import { ContactsList } from './ContactsList';

// import { Wrapper, TitlePhonebook, TitleContacts } from './App.styled';
import { ContactsPage, HomePage, LoginPage, RegisterPage } from '../pages';

import { Routes, Route } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getCurrentUser } from '../redux/auth/authOperations';
import { PublicRoute } from './Routes';
import { PrivateRoute } from './Routes/PrivateRoute';
import { useSelector } from 'react-redux';

export const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCurrentUser());
  }, [dispatch]);

  const isLoadingCurrentUser = useSelector(
    state => state.auth.isLoadingCurrentUser
  );

  if (isLoadingCurrentUser) {
    return <h1>Loading</h1>;
  }

  return (
    <>
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
    </>
  );
};

// return (
//   <>
//     {isLoadingCurrentUser ? (
//       <p>Loading</p>
//     ) : (
//       <Routes>
//         <Route path="/" element={<HomePage />}>
//           <Route
//             index
//             path="login"
//             element={
//               <PublicRoute redirectTo="/contacts">
//                 <LoginPage />
//               </PublicRoute>
//             }
//           />
//           <Route path="registration" element={<RegisterPage />} />
//         </Route>
//         <Route
//           path="/contacts"
//           element={
//             <PrivateRoute redirectTo="/login">
//               <ContactsPage />
//             </PrivateRoute>
//           }
//         />
//         <Route path="*" element={<h1>Not found</h1>} />
//       </Routes>
//     )}
//     <ToastContainer
//       position="top-center"
//       autoClose={5000}
//       hideProgressBar={false}
//       newestOnTop={false}
//       closeOnClick
//       rtl={false}
//       pauseOnFocusLoss
//       draggable
//       pauseOnHover
//     />
//   </>
// );
