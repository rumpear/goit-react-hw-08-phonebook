import { getUserEmail } from '../../redux/auth/authSelectors';
import { useSelector } from 'react-redux/';
import { useDispatch } from 'react-redux/';
import { logoutUser } from '../../redux/auth/authOperations';

export const UserMenu = () => {
  const userEmail = useSelector(getUserEmail);
  const dispatch = useDispatch();

  const logoutHandler = () => {
    dispatch(logoutUser());
  };

  return (
    <>
      <h1>Email: {userEmail}</h1>
      <button type="button" onClick={logoutHandler}>
        Logout
      </button>
    </>
  );
};
