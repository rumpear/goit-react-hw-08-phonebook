import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { fetchContacts } from '../../redux/contacts/contactsOperations';
import {
  getContactsValue,
  getFilterValue,
} from '../../redux/contacts/contactsSelectors';
import { ContactsItem } from './ContactsItem';
import { Loader } from '../ui/Loader';
import { List, Text } from './ContactsList.styled';
import { useState } from 'react';

export const ContactsList = () => {
  const contacts = useSelector(getContactsValue);
  const [isLoading, setIsLoading] = useState(false);
  const filterValue = useSelector(getFilterValue);
  const dispatch = useDispatch();

  useEffect(() => {
    setIsLoading(true);
  }, []);

  useEffect(() => {
    (async function () {
      try {
        await dispatch(fetchContacts()).unwrap();
      } catch (error) {
        toast('Something went wrong. Please reload the page');
      } finally {
        setIsLoading(false);
      }
    })();
  }, [dispatch]);

  const filteredContacts = contacts.filter(({ name }) => {
    return name.toLowerCase().includes(filterValue.toLowerCase());
  });

  if (isLoading) return <Loader size={50} />;

  return (
    <div>
      {filteredContacts.length ? (
        <List>
          {filteredContacts.map(({ id, name, number }) => (
            <ContactsItem key={id} id={id} name={name} number={number} />
          ))}
        </List>
      ) : (
        <Text>Nothing to show</Text>
      )}
    </div>
  );
};
