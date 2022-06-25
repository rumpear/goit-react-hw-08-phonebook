import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import PhoneInputWithCountry from 'react-phone-number-input/react-hook-form';
import 'react-phone-number-input/style.css';

import { IMaskInput } from 'react-imask';

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
import {
  // Button,
  TextField,
  Box,
} from '@mui/material';
import schema from '../../utils/schemes';
import { isPossiblePhoneNumber } from 'react-phone-number-input';
import styled from 'styled-components';

export const ContactsForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const contacts = useSelector(getContactsValue);
  // const error = useSelector(getErrorValue);
  const dispatch = useDispatch();

  const {
    control,
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema.addContact),
  });

  const checkDuplicateName = nameToAdd => {
    return contacts.find(
      ({ name }) => name.toLowerCase() === nameToAdd.toLowerCase()
    );
  };

  const onSubmit = ({ name, phone }) => {
    if (checkDuplicateName(name)) {
      return toast.warn(
        'You are trying to enter a name that is already on the phonebook'
      );
    }

    if (!phone) {
      return toast.warn('Please enter the phone number of your contact');
    }

    createContact(name, phone);
    reset();
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
      <Box
        component="form"
        onSubmit={handleSubmit(onSubmit)}
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          '& .MuiTextField-root': { m: 1, width: '25ch' },
          // '& > button': { m: 1 },
        }}
      >
        <TextField
          type="text"
          label="Name"
          // margin="normal"
          error={!!errors.name}
          helperText={errors.name?.message}
          placeholder="Enter the name of your contact"
          {...register('name')}
        />

        <PhoneInput
          defaultCountry="UA"
          name="phone"
          control={control}
          // country={'ua'}
          placeholder={'+380 (63) 000 00 00'}
          component={TextField}
          rules={{ required: true, validate: isPossiblePhoneNumber }}
        />

        {/* <PhoneField
          country={'ua'}
          placeholder={'+380 (63) 000 00 00'}
          autoFocus={false}
          control={control}
          required={'required'}
        /> */}
        <Button
          type="submit"
          // onClick={() => {
          //   console.log('CLICK');
          // }}
          // disabled={error || isLoading}
        >
          {isLoading ? (
            <>
              <ClipLoader
                size={20}
                css={`
                  margin-right: 10px;
                  border-color: #82878a;
                `}
              />
              Add contact
            </>
          ) : (
            'Add contact'
          )}
        </Button>
        {/* <Button type="submit">{isLoading ? 'Loading' : 'Login'}</Button> */}
        {/* <LoadingButton
          onClick={handleSubmit(onSubmit)}
          endIcon={<SendIcon />}
          loading={isLoading}
          loadingPosition="end"
          variant="contained"
        >
          Send
        </LoadingButton> */}
      </Box>
    </>
  );
};

const PhoneInput = styled(PhoneInputWithCountry)`
  /* width: 400px; */

  & .PhoneInputInput {
    height: 50px;
    ::placeholder {
      color: black;
    }
  }
`;
