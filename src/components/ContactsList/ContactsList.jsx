import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import { useEffect } from 'react';
import { fetchContacts } from '../../redux/contacts/contactsOperations';
import {
  getContactsValue,
  getFilterValue,
} from '../../redux/contacts/contactsSelectors';
import { ContactsItem } from './ContactsItem';
import { SkeletonList } from '../ui/SkeletonList/';
import { List, Text } from './ContactsList.styled';

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

  if (isLoading) return <SkeletonList />;

  return (
    <div>
      {filteredContacts.length ? (
        <List>
          {filteredContacts.map(({ id, name, number }) => (
            <ContactsItem
              key={id}
              id={id}
              name={name}
              number={number}
              contacts={contacts}
            />
          ))}
        </List>
      ) : (
        <>
          <Text>
            Nothing to show...<br></br>You can add your first contact right now
          </Text>
        </>
      )}
    </div>
  );
};
