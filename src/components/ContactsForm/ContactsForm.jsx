import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { IMaskInput } from 'react-imask';
import { toast } from 'react-toastify';
import {
  TextField,
  Box,
  FormControl,
  InputLabel,
  OutlinedInput,
  FormHelperText,
} from '@mui/material';
import schema from '../../utils/schemes';
import { LoadingButton } from '../ui/LoadingButton';
import { forwardRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addContact } from '../../redux/contacts/contactsOperations';
import {
  getContactsValue,
  getErrorValue,
} from '../../redux/contacts/contactsSelectors';

export const ContactsForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const contacts = useSelector(getContactsValue);
  const error = useSelector(getErrorValue);
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

  const TextMaskCustom = forwardRef(function TextMaskCustom(props, ref) {
    const { onChange, ...other } = props;
    return (
      <IMaskInput
        {...other}
        mask="(#00) 00 00 000"
        definitions={{
          '#': /[0-9]/,
        }}
        inputRef={ref}
        onAccept={value => onChange({ target: { name: props.name, value } })}
        overwrite
      />
    );
  });

  return (
    <Box
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        '& .MuiFormControl-root': { m: 1, width: '100%' },
      }}
    >
      <TextField
        type="text"
        label="Name"
        error={!!errors.name}
        helperText={errors.name?.message}
        placeholder="Enter the name of your contact"
        {...register('name')}
      />
      <Controller
        name="phone"
        control={control}
        render={({ field }) => (
          <FormControl error={!!errors.phone}>
            <InputLabel htmlFor="phone-input">Phone</InputLabel>
            <OutlinedInput
              id="phone-input"
              name="phone"
              label="phone"
              placeholder="(063) 00 00 000"
              inputComponent={TextMaskCustom}
              {...field}
            />
            <FormHelperText id="phone-input">
              {errors.phone?.message}
            </FormHelperText>
          </FormControl>
        )}
      />
      <LoadingButton
        text="Add contact"
        error={error}
        isLoading={isLoading}
      ></LoadingButton>
    </Box>
  );
};
