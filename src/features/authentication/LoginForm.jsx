import React, { useState, useContext } from 'react';
import { Form } from 'react-bootstrap';
import { useMutation } from '@tanstack/react-query';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import AuthContext from '../../context/auth/AuthContext';
import { signInUser } from '../../services/UserAuth';
import Button from '../../components/buttons/Button';
import FormGroup from '../../components/forms/FormGroup';
import Riziki from '../../assets/svgs/Logos';
import { links } from '../../utils/links';

const LoginForm = () => {
  const { signInAdmin } = useContext(AuthContext);
  const initialValues = {
    phone_number: '',
    password: '',
  };
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const { isLoading, mutate } = useMutation(signInUser, {
    onSuccess: () => {
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
    signInAdmin(values.phone_number, true);
  };

  return (
    <div className="auth-form__wrapper">
      <Riziki />
      <h5 className="text-muted">Admin Panel</h5>
      <h3>Sign In</h3>
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
          variant="flat"
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
