import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const Title = styled.h1`
  margin-bottom: 15px;
  font-size: 22px;

  @media (min-width: 768px) {
    font-size: 30px;
  }
`;

export const Text = styled.p`
  font-size: 15px;
  margin-bottom: 5px;

  @media (min-width: 768px) {
    font-size: 19px;
  }
`;

export const LoginLink = styled(Link)`
  font-size: 15px;
  color: #1976d2;

  transition: color 300ms cubic-bezier(0.4, 0, 0.2, 1);

  :hover {
    color: #1565c0;
  }

  @media (min-width: 768px) {
    font-size: 19px;
  }
`;
