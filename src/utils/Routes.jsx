import { Route, Routes } from 'react-router-dom';
import React, { Suspense } from 'react';
import FullPageLoader from '../components/spinners/FullPageLoader';
import PrivateRoutes from './PrivateRoutes';
import { links } from './links';

const BaseRouter = () => {
  const Dashboard = React.lazy(() => import('../pages/Dashboard'));
  const SignIn = React.lazy(() => import('../pages/SignIn'));
  const ForgotPassword = React.lazy(() => import('../pages/ForgotPassword'));
  const NotFound = React.lazy(() => import('../pages/NotFound'));
  const SignUp = React.lazy(() => import('../pages/SignUp'));
  const Repairs = React.lazy(() => import('../pages/Repairs'));
  const Staffs = React.lazy(() => import('../pages/Staffs'));
  const Equipments = React.lazy(() => import('../pages/Equipments'));
  const NewStaff = React.lazy(() => import('../pages/NewStaff'));

  return (
    <Suspense fallback={<FullPageLoader />}>
      <Routes>
        <Route element={<PrivateRoutes />}>
          <Route path={links.dashboard} element={<Dashboard />} />
          <Route path={links.repairs} element={<Repairs />} />
          <Route path={links.staffs} element={<Staffs />} />
          <Route path={links.equipments} element={<Equipments />} />
          <Route path={links.newStaff} element={<NewStaff />} />
        </Route>
        <Route path={links.signUp} element={<SignUp />} />
        <Route path={links.signIn} element={<SignIn />} />
        <Route path={links.forgotPassword} element={<ForgotPassword />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  );
};

export default BaseRouter;
