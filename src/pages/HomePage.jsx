import { Outlet } from 'react-router-dom';
import { UserMenu } from '../components/UserMenu';
import { Section } from '../components/ui/Section';
import { getIsLoggedIn } from '../redux/auth/authSelectors';
import { useSelector } from 'react-redux';

export const HomePage = () => {
  const isLoggedIn = useSelector(getIsLoggedIn);

  return (
    <Section>
      <h1>Contacts Book</h1>
      <p>Enter credentials to access your account</p>
      {isLoggedIn && <UserMenu />}

      <Outlet />
    </Section>
  );
};
