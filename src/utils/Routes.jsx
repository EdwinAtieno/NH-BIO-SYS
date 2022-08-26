import { Route, Routes } from 'react-router-dom';
import React, { Suspense } from 'react';
import FullPageLoader from '../components/spinners/FullPageLoader';
import PrivateRoutes from './PrivateRoutes';
import { links } from './links';

const BaseRouter = () => {
  const Dashboard = React.lazy(() => import('../pages/Dashboard'));
  const AddRegion = React.lazy(() => import('../pages/AddRegion'));
  const Regions = React.lazy(() => import('../pages/Regions'));
  const RegionsMap = React.lazy(() => import('../pages/RegionsMap'));
  const SignIn = React.lazy(() => import('../pages/SignIn'));
  const ForgotPassword = React.lazy(() => import('../pages/ForgotPassword'));
  const NotFound = React.lazy(() => import('../pages/NotFound'));

  return (
    <Suspense fallback={<FullPageLoader />}>
      <Routes>
        <Route element={<PrivateRoutes />}>
          <Route path={links.dashboard} element={<Dashboard />} />
          <Route path={links.addRegion} element={<AddRegion />} />
          <Route path={links.regions} element={<Regions />} />
          <Route path={links.regionsInMap} element={<RegionsMap />} />
        </Route>

        <Route path={links.signIn} element={<SignIn />} />
        <Route path={links.forgotPassword} element={<ForgotPassword />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  );
};

export default BaseRouter;
