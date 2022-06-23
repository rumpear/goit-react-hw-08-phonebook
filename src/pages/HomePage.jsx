import {
  // NavLink,
  Outlet,
} from 'react-router-dom';
import { UserMenu } from '../components/UserMenu';
import { Section } from '../components/ui/Section';
import { getIsLoggedIn } from '../redux/auth/authSelectors';
import { useSelector } from 'react-redux';
// import { LoginPage } from './LoginPage';
// import { RegisterPage } from './RegisterPage';
// import { useState } from 'react';

export const HomePage = () => {
  const isLoggedIn = useSelector(getIsLoggedIn);
  // console.log(isLoggedIn, 'isLoggedIn');
  // const [register, setRegister] = useState(false);
  return (
    <Section>
      <h1>Hello</h1>
      {isLoggedIn && <UserMenu />}
      {/* <NavLink to="/">Login</NavLink>
      <NavLink to="/registration">Registration</NavLink>
      <NavLink to="/contacts">Contacts</NavLink> */}

      <Outlet />
      {/* {register ? (
        <RegisterPage />
      ) : (
        <>
          <LoginPage />
          <p>Don't have acc yet? Register</p>
          <button type="button" onClick={() => setRegister(true)}>
            Register
          </button>
        </>
      )} */}
    </Section>
  );
};
