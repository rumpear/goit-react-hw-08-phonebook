import styled from 'styled-components';

export const Item = styled.li`
  font-size: 17px;
  margin-bottom: 15px;
  padding: 18px;

  display: flex;
  justify-content: space-between;
  align-items: center;

  /* max-width: 300px; */
  width: 275px;
  /* text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden; */

  background-color: #fff;
  color: rgba(0, 0, 0, 0.87);
  -webkit-transition: box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
  transition: box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
  border-radius: 4px;
  box-shadow: 0px 2px 1px -1px rgb(0 0 0 / 20%),
    0px 1px 1px 0px rgb(0 0 0 / 14%), 0px 1px 3px 0px rgb(0 0 0 / 12%);

  :last-child {
    margin-bottom: 0;
  }

  @media (min-width: 768px) {
    margin: 0;
  }
`;

export const Name = styled.p`
  font-size: 17px;
  margin-bottom: 10px;
  text-align: left;
  /* text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden; */
`;

export const Phone = styled.a`
  font-size: 17px;
  color: black;
  display: block;
  text-align: left;
`;

export const Button = styled.button`
  display: inline-flex;
  /* display: flex; */
  justify-content: center;
  align-items: center;
  width: 30px;
  height: 30px;
  margin-left: 10px;
  /* padding: 10px; */

  background-color: #f5f4fa;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.15);

  font-family: inherit;
  font-size: 16px;
  font-weight: 500;

  text-align: center;
  border-radius: 50%;
  border: none;

  line-height: 1.87;
  letter-spacing: 0.06em;

  transition: background-color 300ms cubic-bezier(0.4, 0, 0.2, 1);

  cursor: pointer;

  :hover {
    background-color: rgba(77, 77, 77, 0.1);
  }
`;
