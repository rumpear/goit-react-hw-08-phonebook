import { Box, TextField } from '@mui/material';
import styled from 'styled-components';

export const Input = styled(TextField)`
  /* & .MuiTextField-root {
    margin-bottom: 20px;
    margin-top: 40px;
    width: 500px;
    color: red;
    background-color: aliceblue;
  }
  & .MuiTextField-root {
    margin-bottom: 20px;
    margin-top: 40px;
    width: 500px;
    color: red;
    background-color: aliceblue;
  } */

  /* & .MuiInputBase-root {
    margin-bottom: 20px;
    width: 500px;
    color: red;
    background-color: aliceblue;
  }

  & .MuiOutlinedInput-input {
    margin-top: 200px;
  }

  & .MuiInputLabel-root {
    color: wheat;
  }
  */
  /* & .MuiFormLabel-root {
    color: wheat;
  } */
`;

// export const Input = styled(TextField)`
//   /* display: block;
//   margin-bottom: 50px;
//   color: red;
//   background-color: aliceblue;
//   width: 600px;
//   margin: 60px; */
// `;

export const Form = styled(Box)`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 300px;
  margin: 100px auto 0px;
`;
