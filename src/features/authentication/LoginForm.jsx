import React, { useEffect, useState } from 'react';
import { Form } from 'react-bootstrap';
import { useMutation } from '@tanstack/react-query';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import jwtDecode from 'jwt-decode';
import dayjs from 'dayjs';
import { signInUser } from '../../services/auth';
import Button from '../../components/buttons/Button';
import FormGroup from '../../components/forms/FormGroup';
import Riziki from '../../assets/svgs/Logos';
import { links } from '../../utils/links';
import useAuth from '../../hooks/useAuth';

const LoginForm = () => {
  const { authToken, signIn, logOut } = useAuth();
  const initialValues = {
    phone_number: '',
    password: '',
  };
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    if (authToken) {
      try {
        const userData = jwtDecode(authToken?.refresh);
        const isExpired = dayjs.unix(userData?.exp).diff(dayjs()) < 1;

        if (!isExpired) {
          navigate(links.dashboard, { replace: true });
        }
      } catch (err) {
        logOut();
        navigate(links.signIn, { replace: true });
      }
    }
  }, []);

  const { isLoading, mutate } = useMutation(signInUser, {
    onSuccess: (data) => {
      signIn(data);
      navigate(links.dashboard);
    },

    onError: (error) => {
      if (error?.response?.status === 400) {
        setErrors(error?.response?.data);
        return;
      }

      if (error?.response?.status === 401) {
        setErrors({ form: 'Invalid phone number or password' });
        return;
      }
      toast.error('Oh snap! Something went wrong!');
    },
  });

  const onChange = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();
    setErrors(null);
    mutate(values);
  };

  return (
    <div className="auth-form__wrapper">
      <Riziki />
      <h5 className="text-muted">Admin Panel</h5>
      <h4>Sign In</h4>
      <p className="text-muted">
        To manage products, orders, deliveries and much more
      </p>
      <Form className="auth-form__form" onSubmit={onSubmitHandler}>
        <FormGroup
          type="number"
          name="phone_number"
          label="Phone Number"
          value={values.phone_number}
          onChange={onChange}
          placeholder="254 xxx xxx xxx"
          error={errors?.phone_number}
          required
        />
        <FormGroup
          type="password"
          name="password"
          label="Pin"
          value={values.password}
          onChange={onChange}
          placeholder="******"
          error={errors?.password}
          required
        />
        <Button
          variant="green"
          type="submit"
          isLoading={isLoading}
          disabled={isLoading}
        >
          {isLoading ? 'Signing In...' : 'Sign In'}
        </Button>
      </Form>
      {errors?.form && (
        <div className="w-100 text-danger mt-2">{errors?.form}</div>
      )}

      <div className="other-options">
        <Link to={links.forgotPassword}>Forgot Pin</Link>
      </div>
    </div>
  );
};

export default LoginForm;
