// import { NavLink, Outlet } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { getIsLoggedIn } from '../redux/auth/authSelectors';
import { loginUser } from '../redux/auth/authOperations';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useState } from 'react';

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
  const isLoggedIn = useSelector(getIsLoggedIn);
  const error = useSelector(state => state.auth.error);
  const navigate = useNavigate();
  // const [loading, setLoading] = useState(false);
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
    // setLoading(true);
    dispatch(loginUser(data));
    reset();
  };

  // if (isLoggedIn) {
  //   navigate('/contacts');
  // }

  if (error) {
    toast('You entered the wrong password or email');
  }

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
    </>
  );
};
