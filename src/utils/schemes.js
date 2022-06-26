import * as yup from 'yup';

const passwordRegex = /^((?=\S*?[A-Z])(?=\S*?[a-z])(?=\S*?[0-9]).{7,})\S$/;

const login = yup.object().shape({
  email: yup
    .string()
    .email('Please enter a valid email')
    .required('Please enter your email'),
  password: yup
    .string()
    .min(7, 'The password must not be less than 7 characters')
    .max(32, 'The password must not be greater than 32 characters')
    .required('Please enter your password'),
});

const signup = yup.object().shape({
  name: yup
    .string()
    .min(2, 'The name must not be less than two characters')
    .max(32, 'The name must not be greater than 32 characters')
    .required('Please enter your name'),
  email: yup
    .string()
    .email('Please enter a valid email')
    .required('Please enter your email'),
  password: yup
    .string()
    .min(7, 'The password must not be less than 7 characters')
    .max(32, 'The password must not be greater than 32 characters')
    .matches(
      passwordRegex,
      'Password must have at least 1 uppercase letter, 1 lowercase letter, and 1 number with no spaces'
    )
    .required('Please enter your password'),
  passwordConfirm: yup
    .string()
    .oneOf([yup.ref('password'), null], 'Passwords do not match')
    .required('Please confirm your password'),
});

const addContact = yup.object().shape({
  name: yup
    .string()
    .min(2, 'The name must not be less than 2 characters')
    .max(22, 'The name must not be greater than 22 characters')
    .required('Please enter the name of your contact'),
  phone: yup
    .string()
    .length(15, 'Please enter the valid phone number')
    .required('Please enter the phone number of your contact'),
});

const schema = { login, signup, addContact };

export default schema;
