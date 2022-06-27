import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { registerUser } from '../../redux/auth/authOperations';
import schema from '../../utils/schemes';
import { LoginLink, Text, Title } from './RegisterPage.styled';
import { Box, TextField } from '@mui/material';
import { LoadingButton } from '../../components/ui/LoadingButton';
import { useSelector } from 'react-redux';

export const RegisterPage = () => {
  const dispatch = useDispatch();
  const isLoading = useSelector(state => state.auth.isLoading);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema.signup),
  });

  const onSubmit = async data => {
    const { name, email, password } = data;
    try {
      await dispatch(registerUser({ name, email, password })).unwrap();
    } catch (error) {
      toast(`Email ${email} has already been taken`);
    }
    reset();
  };

  return (
    <>
      <Title>Sign Up</Title>
      <Text>It’s quick and easy</Text>
      <Box
        component="form"
        onSubmit={handleSubmit(onSubmit)}
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          '& .MuiTextField-root': { m: 1, width: '100%' },
        }}
      >
        <TextField
          label="Name"
          error={!!errors.name}
          helperText={errors.name?.message}
          placeholder="Please enter your name"
          {...register('name')}
        />
        <TextField
          label="Email"
          error={!!errors.email}
          helperText={errors.email?.message}
          placeholder="Please enter your email"
          {...register('email')}
        />
        <TextField
          // type="password"
          label="Password"
          error={!!errors.password}
          helperText={errors.password?.message}
          placeholder="Please enter your password"
          {...register('password')}
        />
        <TextField
          // type="password"
          label="Confirm password"
          error={!!errors.passwordConfirm}
          helperText={errors.passwordConfirm?.message}
          placeholder="Please confirm your password"
          {...register('passwordConfirm')}
        />
        <LoadingButton text="Sign Up" isLoading={isLoading} />
      </Box>

      <Text>Already have an account?</Text>
      <LoginLink to="/">Go to login</LoginLink>
    </>
  );
};
