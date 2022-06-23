import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { getIsLoggedIn } from '../../redux/auth/authSelectors';

export const PublicRoute = ({ children, redirectTo = '/' }) => {
  const isLoggedIn = useSelector(getIsLoggedIn);

  return isLoggedIn ? (
    <Navigate to={redirectTo} replace={true} />
  ) : (
    <>{children}</>
  );
};
