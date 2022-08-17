import { Route, Routes } from 'react-router-dom';
import React, { Suspense } from 'react';
import SuspenseLoader from '../components/spinners/SuspenseLoader';
import { links } from './links';
import PrivateRoutes from './PrivateRoutes';

const BaseRouter = () => {
  const DashboardPage = React.lazy(() => import('../pages/DashboardPage'));
  const SignInPage = React.lazy(() => import('../pages/SignInPage'));
  const ForgotPasswordPage = React.lazy(() =>
    import('../pages/ForgotPasswordPage')
  );
  const NotFoundPage = React.lazy(() => import('../pages/NotFoundPage'));

  return (
    <Suspense fallback={<SuspenseLoader />}>
      <Routes>
        <Route element={<PrivateRoutes />}>
          <Route path={links.dashboard} element={<DashboardPage />} />
        </Route>

        <Route path={links.signIn} element={<SignInPage />} />
        <Route path={links.forgotPassword} element={<ForgotPasswordPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Suspense>
  );
};

export default BaseRouter;
