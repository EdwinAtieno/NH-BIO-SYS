import { useEffect } from 'react';
import { Navigate, Outlet, useNavigate } from 'react-router-dom';
import { links } from './links';

const PrivateRoutes = () => {
  const navigate = useNavigate();
  let localData = localStorage.getItem('user');
  localData = JSON.parse(localData);

  useEffect(() => {
    if (localData === null || localData === undefined) {
      navigate(links.signIn, { replace: true });
    }
  }, [localData, navigate]);

  return localData?.admin ? <Outlet /> : <Navigate to={links.signIn} />;
};

export default PrivateRoutes;
