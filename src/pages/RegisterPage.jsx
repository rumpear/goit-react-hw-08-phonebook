import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { registerUser } from '../redux/auth/authOperations';
import { Link } from 'react-router-dom';

const passwordRegex = /^((?=\S*?[A-Z])(?=\S*?[a-z])(?=\S*?[0-9]).{7,})\S$/;

const registrationSchema = yup.object().shape({
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

export const RegisterPage = () => {
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(registrationSchema),
  });

  const onSubmit = async data => {
    const { name, email, password } = data;
    try {
      await dispatch(registerUser({ name, email, password })).unwrap();
    } catch (error) {
      console.log(error);
      toast(`Email ${email} has already been taken`);
    }
    reset();
  };

  return (
    <>
      <h1>Registration</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input placeholder="Name" {...register('name')} />
        <p>{errors.name?.message}</p>

        <input placeholder="Email" {...register('email')} />
        <p>{errors.email?.message}</p>

        <input
          // type="password"
          placeholder="Password"
          {...register('password')}
        ></input>
        <p>{errors.password?.message}</p>

        <input
          // type="password"
          placeholder="Confirm password"
          {...register('passwordConfirm')}
        ></input>
        <p>{errors.passwordConfirm?.message}</p>

        <br></br>

        <button type="submit">Registration</button>
      </form>
      <>
        <p>Already signed up?</p> <Link to="/">Go to login</Link>
      </>
    </>
  );
};
