import styled from 'styled-components';

export const List = styled.ul`
  @media (max-width: 768px) {
    font-size: 17px;
    display: flex;
    flex-direction: column;
    width: 300px;
  }

  @media (min-width: 768px) {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
  }
`;

export const Text = styled.p`
  font-size: 20px;
  /* letter-spacing: 1.5; */
  /* font-weight: 400; */
  line-height: 1.5;
  /* letter-spacing: 0.06em; */
`;
