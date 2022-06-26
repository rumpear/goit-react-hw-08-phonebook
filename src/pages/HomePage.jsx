import { Outlet } from 'react-router-dom';
import { Section } from '../components/ui/Section';

export const HomePage = () => {
  return (
    <Section>
      <h1>Contacts</h1>
      <Outlet />
    </Section>
  );
};
