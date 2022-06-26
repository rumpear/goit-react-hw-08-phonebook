import { Section } from '../../components/ui/Section';
import { ContactsFilter } from '../../components/ContactsFilter';
import { ContactsForm } from '../../components/ContactsForm';
import { ContactsList } from '../../components/ContactsList';

import {
  Wrapper,
  AddContact,
  TitlePhonebook,
  TitleContacts,
  ContactsSection,
} from './ContactsPage.styled';
import { ContactsAppBar } from '../../components/ContactsAppBar';

export const ContactsPage = () => {
  return (
    <>
      <ContactsAppBar />
      <Section>
        <Wrapper>
          <AddContact>
            <TitlePhonebook>Phonebook</TitlePhonebook>
            <ContactsForm />
            <ContactsFilter />
          </AddContact>
          <ContactsSection>
            <TitleContacts>List</TitleContacts>
            <ContactsList />
          </ContactsSection>
        </Wrapper>
      </Section>
    </>
  );
};
