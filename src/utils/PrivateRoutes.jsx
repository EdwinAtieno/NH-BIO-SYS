import dayjs from 'dayjs';
import jwtDecode from 'jwt-decode';
import { useEffect } from 'react';
import { Navigate, Outlet, useLocation, useNavigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import { links } from './links';

const PrivateRoutes = () => {
  const { authToken, logOut } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (authToken) {
      try {
        const userData = jwtDecode(authToken?.refresh);
        const isExpired = dayjs.unix(userData?.exp).diff(dayjs()) < 1;

        if (isExpired) {
          logOut();
          navigate(links.signIn, { replace: true });
        }
      } catch (err) {
        logOut();
        navigate(links.signIn, { replace: true });
      }
    }
  }, [authToken]);

  return !authToken ? (
    <Navigate to={links.signIn} state={{ from: location }} replace />
  ) : (
    <Outlet />
  );
};

export default PrivateRoutes;
