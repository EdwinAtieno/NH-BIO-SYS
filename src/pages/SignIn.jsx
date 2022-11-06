import LoginForm from '../features/authentication/LoginForm';
import AuthLayout from '../layouts/AuthLayout';

const SignIn = () => {
  return (
    <div className="sign-in-page__container">
      <AuthLayout>
        <LoginForm />
      </AuthLayout>
    </div>
  );
};

export default SignIn;
