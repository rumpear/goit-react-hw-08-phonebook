import styled from 'styled-components';

export const Title = styled.h1`
  margin-bottom: 15px;
  font-size: 35px;
  color: #1976d2;

  @media (min-width: 768px) {
    font-size: 50px;
  }
`;

export const Container = styled.div`
  margin-left: auto;
  margin-right: auto;

  text-align: center;

  padding: 50px 15px;
  max-width: 350px;

  @media (min-width: 768px) {
    padding: 100px 15px;
  }
`;
