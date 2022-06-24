import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { loginUser } from '../../redux/auth/authOperations';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import schema from '../../utils/schemes';

import * as React from 'react';
import { Button, TextField, Box } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import { Input, Form } from './LoginPage.styled';
import SendIcon from '@mui/icons-material/Send';

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
      <Box
        component="form"
        // onSubmit={handleSubmit(onSubmit)}
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          '& .MuiTextField-root': { m: 1, width: '25ch' },
          // '& > button': { m: 1 },
        }}
      >
        <Input
          label="Email"
          error={!!errors.email}
          helperText={errors.email?.message}
          placeholder="Please enter your email"
          {...register('email')}
        />
        <TextField
          // type="password"
          label="Password"
          // margin="normal"
          error={!!errors.password}
          helperText={errors.password?.message}
          placeholder="Please enter your password"
          {...register('password')}
        />
        {/* <Button type="submit">{isLoading ? 'Loading' : 'Login'}</Button> */}
        <LoadingButton
          onClick={handleSubmit(onSubmit)}
          endIcon={<SendIcon />}
          loading={isLoading}
          loadingPosition="end"
          variant="contained"
        >
          Send
          {/* {isLoading ? 'Loading' : 'Login'} */}
        </LoadingButton>
      </Box>
      <>
        <br></br>
        <p>Don't have an account yet?</p>{' '}
        <Link to={'registration'}>Sign up</Link>
      </>
    </>
  );
};
