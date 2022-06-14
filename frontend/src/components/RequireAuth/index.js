import { useLocation, Navigate, Outlet } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';

const RequireAuth = () => {
  const location = useLocation();
  const { auth } = useAuth();

  return auth?.accessToken ? (
    <Outlet />
  ) : (
    <Navigate to='/connexion' state={{ from: location }} replace />
  );
};

export default RequireAuth;
