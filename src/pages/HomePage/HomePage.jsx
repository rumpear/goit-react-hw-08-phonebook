import { Outlet } from 'react-router-dom';
import { Wrapper, Container, Title } from './HomePage.styled';

export const HomePage = () => {
  return (
    // <Wrapper>
    <Container>
      <Title>Contacts</Title>
      <Outlet />
    </Container>
    // </Wrapper>
  );
};
