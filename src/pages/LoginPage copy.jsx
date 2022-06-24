import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { loginUser } from '../redux/auth/authOperations';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import schema from '../utils/schemes';

import * as React from 'react';
import Button from '@mui/material/Button';

export const LoginPage = () => {
  const dispatch = useDispatch();
  const isLoading = useSelector(state => state.auth.isLoading);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema.login),
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
      <br></br>
      <h1>Login</h1>
      <br></br>
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

        <Button type="submit">{isLoading ? 'Loading' : 'Login'}</Button>
      </form>
      <>
        <br></br>
        <p>Don't have an account yet?</p>{' '}
        <Link to={'registration'}>Sign up</Link>
      </>
    </>
  );
};
