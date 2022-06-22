import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { Section } from './ui/Section';
import { ContactsFilter } from './ContactsFilter';
import { ContactsForm } from './ContactsForm';
import { ContactsList } from './ContactsList';

import { Wrapper, TitlePhonebook, TitleContacts } from './App.styled';
import { ContactsPage, HomePage, LoginPage, RegisterPage } from '../pages';

import { Routes, Route } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getCurrentUser } from '../redux/auth/authOperations';

export const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getCurrentUser());
  }, [dispatch]);

  return (
    <>
      {' '}
      <Routes>
        <Route path="/" element={<HomePage />}>
          <Route path="login" element={<LoginPage />} />
          <Route path="registration" element={<RegisterPage />} />
        </Route>
        <Route path="/contacts" element={<ContactsPage />} />
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
    // <Section>
    //   <Wrapper>
    //     <TitlePhonebook>Phonebook</TitlePhonebook>
    //     <ContactsForm />
    //     <ContactsFilter />
    //     <TitleContacts>Contacts</TitleContacts>
    //     <ContactsList />
    //     <RegisterPage />
    //   </Wrapper>
    // <ToastContainer
    //   position="top-center"
    //   autoClose={5000}
    //   hideProgressBar={false}
    //   newestOnTop={false}
    //   closeOnClick
    //   rtl={false}
    //   pauseOnFocusLoss
    //   draggable
    //   pauseOnHover
    // />
    // </Section>
  );
};
