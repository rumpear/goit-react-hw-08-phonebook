import { Section } from '../components/ui/Section';
import { ContactsFilter } from '../components/ContactsFilter';
import { ContactsForm } from '../components/ContactsForm';
import { ContactsList } from '../components/ContactsList';

import {
  Wrapper,
  TitlePhonebook,
  TitleContacts,
} from '../components/App.styled';
import { UserMenu } from '../components/UserMenu/';

export const ContactsPage = () => {
  return (
    <Section>
      <Wrapper>
        <UserMenu />
        <TitlePhonebook>Phonebook</TitlePhonebook>
        <ContactsForm />
        <ContactsFilter />
        <TitleContacts>Contacts</TitleContacts>
        <ContactsList />
      </Wrapper>
    </Section>
  );
};
