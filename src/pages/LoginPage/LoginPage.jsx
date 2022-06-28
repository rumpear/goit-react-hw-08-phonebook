import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { loginUser } from '../../redux/auth/authOperations';
import { toast } from 'react-toastify';
import { TextField, Box } from '@mui/material';
import { LoadingButton } from '../../components/ui/LoadingButton';
import schema from '../../utils/schemes';
import { getAuthIsLoading } from '../../redux/auth/authSelectors';

import { Text, SignUpLink } from './LoginPage.styled';

export const LoginPage = () => {
  const dispatch = useDispatch();
  const isLoading = useSelector(getAuthIsLoading);

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
      return;
    }
    reset();
  };

  return (
    <>
      <Text>Enter credentials to access your account</Text>
      <Box
        component="form"
        onSubmit={handleSubmit(onSubmit)}
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          '& .MuiTextField-root': {
            m: 1,
            width: '100%',
          },
        }}
      >
        <TextField
          label="Email"
          error={!!errors.email}
          helperText={errors.email?.message}
          placeholder="Please enter your email"
          {...register('email')}
        />
        <TextField
          type="password"
          label="Password"
          error={!!errors.password}
          helperText={errors.password?.message}
          placeholder="Please enter your password"
          {...register('password')}
        />
        <LoadingButton text="LOGIN" isLoading={isLoading} />
      </Box>
      <Text>Don't have an account yet?</Text>
      <SignUpLink to={'signup'}>Sign up</SignUpLink>
    </>
  );
};
