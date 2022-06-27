import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const Text = styled.p`
  font-size: 15px;
  margin-bottom: 5px;

  @media (min-width: 768px) {
    font-size: 19px;
  }
`;

export const SignUpLink = styled(Link)`
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
