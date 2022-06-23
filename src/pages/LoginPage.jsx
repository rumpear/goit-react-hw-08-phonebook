import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { loginUser } from '../redux/auth/authOperations';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';

const loginSchema = yup.object().shape({
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

export const LoginPage = () => {
  const dispatch = useDispatch();
  const isLoading = useSelector(state => state.auth.isLoading);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(loginSchema),
  });

  const onSubmit = async data => {
    try {
      await dispatch(loginUser(data)).unwrap();
    } catch (error) {
      toast('Wrong email or password');
    }
    reset();
  };

  return (
    <>
      <h1>Login</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input placeholder="Email" {...register('email')} />
        <p>{errors.email?.message}</p>

        <input
          // type="password"
          placeholder="Password"
          {...register('password')}
        ></input>
        <p>{errors.password?.message}</p>

        <br></br>

        <button type="submit">{isLoading ? 'Loading' : 'Login'}</button>
      </form>
      <>
        <p>Don't have an account yet?</p>{' '}
        <Link to={'registration'}>Sign up</Link>
      </>
    </>
  );
};
