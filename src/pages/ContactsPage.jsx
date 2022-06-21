import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { Section } from '../components/ui/Section';
import { ContactsFilter } from '../components/ContactsFilter';
import { ContactsForm } from '../components/ContactsForm';
import { ContactsList } from '../components/ContactsList';

import {
  Wrapper,
  TitlePhonebook,
  TitleContacts,
} from '../components/App.styled';
import { UserMenu } from '../components/AppBar/UserMenu/';

export const ContactsPage = () => {
  return (
    <Section>
      <Wrapper>
        {/* <UserMenu /> */}
        <TitlePhonebook>Phonebook</TitlePhonebook>
        <ContactsForm />
        <ContactsFilter />
        <TitleContacts>Contacts</TitleContacts>
        <ContactsList />
      </Wrapper>
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
    </Section>
  );
};
