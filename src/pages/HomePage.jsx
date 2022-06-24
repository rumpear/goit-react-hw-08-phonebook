import { Outlet } from 'react-router-dom';
import { UserMenu } from '../components/UserMenu';
import { Section } from '../components/ui/Section';
import { getIsLoggedIn } from '../redux/auth/authSelectors';
import { useSelector } from 'react-redux';

export const HomePage = () => {
  const isLoggedIn = useSelector(getIsLoggedIn);

  return (
    <Section>
      <h1>Hello</h1>
      {isLoggedIn && <UserMenu />}

      <Outlet />
    </Section>
  );
};
