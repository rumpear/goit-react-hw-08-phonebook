import { Formik, ErrorMessage } from 'formik';
import { toast } from 'react-toastify';
import 'react-phone-input-2/lib/style.css';
import { ClipLoader } from 'react-spinners';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addContact } from '../../redux/contacts/contactsOperations';
import {
  getContactsValue,
  getErrorValue,
} from '../../redux/contacts/contactsSelectors';
import {
  FormBody,
  Title,
  Input,
  Button,
  Error,
  PhoneField,
} from './ContactsForm.styled';
import schema from '../../utils/schemes';

export const ContactsForm = () => {
  const [phone, setPhone] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const contacts = useSelector(getContactsValue);
  const error = useSelector(getErrorValue);
  const dispatch = useDispatch();

  const checkDuplicateName = nameToAdd => {
    return contacts.find(
      ({ name }) => name.toLowerCase() === nameToAdd.toLowerCase()
    );
  };

  const handleSubmit = ({ name }, { resetForm }) => {
    if (checkDuplicateName(name)) {
      toast.warn(
        'You are trying to enter a name that is already on the phonebook'
      );
      return;
    }

    if (!phone) {
      toast.warn('Please enter the phone number of your contact');
      return;
    }

    createContact(name, phone);
    resetForm();
    setPhone('');
  };

  const createContact = async (name, number) => {
    const contact = {
      name,
      number,
    };

    try {
      setIsLoading(true);
      await dispatch(addContact(contact)).unwrap();
    } catch (error) {
      toast('Something went wrong. Please reload the page');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Formik
        initialValues={{
          name: '',
        }}
        validationSchema={schema.addContact}
        onSubmit={handleSubmit}
      >
        <FormBody>
          <Title>Name</Title>
          <Input
            autoFocus={false}
            placeholder={'Enter the name of your contact'}
            type="text"
            name="name"
            title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          />
          <ErrorMessage name="name" component={Error} />
          <Title>Phone</Title>
          <PhoneField
            country={'ua'}
            placeholder={'+380 (63) 000 00 00'}
            autoFocus={false}
            value={phone}
            onChange={setPhone}
            required={'required'}
          />
          <Button type="submit" disabled={error || isLoading}>
            {isLoading ? (
              <>
                <ClipLoader
                  size={20}
                  css={`
                    margin-right: 10px;
                    border-color: #82878a;
                  `}
                />{' '}
                Add contact
              </>
            ) : (
              'Add contact'
            )}
          </Button>
        </FormBody>
      </Formik>
    </>
  );
};
