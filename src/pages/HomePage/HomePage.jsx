import { Outlet } from 'react-router-dom';
import { Container, Title } from './HomePage.styled';

export const HomePage = () => {
  return (
    <Container>
      <Title>Contacts</Title>
      <Outlet />
    </Container>
  );
};
