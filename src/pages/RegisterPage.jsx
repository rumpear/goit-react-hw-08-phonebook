import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { registerUser } from '../redux/auth/authOperations';
import { Link } from 'react-router-dom';
import schema from '../utils/schemes';

export const RegisterPage = () => {
  const dispatch = useDispatch();

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
