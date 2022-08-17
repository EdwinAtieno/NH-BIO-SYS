import React, { useState } from 'react';
import { Form } from 'react-bootstrap';
import { useMutation } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { recoverPassword } from '../../services/UserAuth';
import Button from '../../components/buttons/Button';
import FormGroup from '../../components/forms/FormGroup';
import Riziki from '../../assets/svgs/Logos';
import { links } from '../../utils/links';

const ForgotPasswordForm = () => {
  const initialValues = {
    phone_number: '',
  };
  const [values, setValues] = useState(initialValues);
  const { isLoading, mutate } = useMutation(recoverPassword, {
    onSuccess: () => {
      toast.success('We have sent you an SMS with a new pin.', {
        autoClose: 8000,
      });
    },

    onError: () => {
      toast.error('Oh snap! Something went wrong!');
    },
  });

  const onChange = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();
    mutate(values);
  };

  return (
    <div className="auth-form__wrapper">
      <Riziki />
      <h5 className="text-muted">Admin Panel</h5>
      <h3>Forgot Your Pin?</h3>
      <p className="text-muted">
        Enter your phone number below and we will send you a new pin.
      </p>
      <Form className="auth-form__form" onSubmit={onSubmitHandler}>
        <FormGroup
          type="number"
          name="phone_number"
          label="Phone Number"
          value={values.phone_number}
          onChange={onChange}
          placeholder="254 xxx xxx xxx"
          required
        />

        <Button
          variant="flat"
          type="submit"
          isLoading={isLoading}
          disabled={isLoading}
        >
          {isLoading ? 'Resetting Pin...' : 'Reset Pin'}
        </Button>
      </Form>
      <div className="other-options">
        Remember your pin? <Link to={links.signIn}>Sign In</Link>
      </div>
    </div>
  );
};

export default ForgotPasswordForm;
