import styled from 'styled-components';

export const Wrapper = styled.div`
  display: flex;
  justify-content: center;

  margin: 0px auto;

  font-family: 'Poppins', 'Roboto';

  @media (max-width: 767px) {
    flex-direction: column;
    align-items: center;
  }
`;

export const AddContact = styled.div`
  max-width: 315px;
  height: 100%;

  margin-bottom: 20px;
  padding: 20px;

  background-color: rgba(151, 151, 151, 0.1);
  border-radius: 5px;
  box-shadow: rgba(99, 99, 99, 0.322) 0px 2px 8px 0px;

  @media (min-width: 768px) {
    margin-bottom: 0;
    margin-right: 30px;
  }

  @media (min-width: 1024px) {
    width: 345px;
  }

  @media (min-width: 1440px) {
    margin-right: 50px;
  }
`;

export const ContactsSection = styled.div`
  height: 100%;
  width: 315px;

  padding: 20px;

  background-color: rgba(151, 151, 151, 0.1);
  border-radius: 5px;
  box-shadow: rgba(99, 99, 99, 0.322) 0px 2px 8px 0px;

  @media (min-width: 768px) {
    width: 320px;
  }
  @media (min-width: 1024px) {
    width: 600px;
  }
`;

export const TitlePhonebook = styled.h1`
  margin-bottom: 15px;
  font-size: 30px;
`;

export const TitleContacts = styled.h1`
  margin-bottom: 23px;
  font-size: 30px;
`;
