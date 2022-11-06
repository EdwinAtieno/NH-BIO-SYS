import ForgotPasswordForm from '../features/authentication/ForgotPasswordForm';
import AuthLayout from '../layouts/AuthLayout';

const ForgotPassword = () => {
  return (
    <AuthLayout>
      <ForgotPasswordForm />
    </AuthLayout>
  );
};

export default ForgotPassword;
