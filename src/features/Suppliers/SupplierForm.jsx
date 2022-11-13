import React, { useState } from 'react';
import { Form } from 'react-bootstrap';
import { useMutation } from '@tanstack/react-query';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { createSupplier } from '../../services/suppliers';
import Button from '../../components/buttons/Button';
import FormGroup from '../../components/forms/FormGroup';
import FormSelect from '../../components/forms/FormSelect';
import Riziki from '../../assets/svgs/Logos';
import { links } from '../../utils/links';

const SupplierForm = () => {
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});
  const initialValues = {
    email: '',
    first_name: '',
    last_name: '',
    role: '',
    middle_name: '',
    staff_number: '',
    password: '',
    phone_number: '',
  };
  const [values, setValues] = useState(initialValues);

  const { isLoading, mutate } = useMutation((data) => createSupplier(data), {
    onSuccess: () => {
      toast.success('You have registered successfully.', {
        autoClose: 8000,
      });
      navigate(links.signIn);
    },
    onError: (error) => {
      if (error?.response?.status === 400) {
        setErrors(error?.response?.data);
        return;
      }

      if (error?.response?.status === 401) {
        setErrors({ form: 'Invalid staff number or password' });
        return;
      }
      toast.error('Oh snap! Something went wrong!');
    },
  });
  const roles = ['h.o.d', 'biomed', 'suppliers_admin'];
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
      <h5>New user?</h5>
      <p className="text-muted">
        Enter your information below and we will register you as a new user.
      </p>
      <Form className="auth-form__form" onSubmit={onSubmitHandler}>
        <div className="row">
          <div className="col-md-6">
            <FormGroup
              type="text"
              name="first_name"
              label="First Name"
              value={values.first_name}
              onChange={onChange}
              placeholder="first name"
              error={errors?.first_name}
              required
            />
          </div>
          <div className="col-md-6">
            <FormGroup
              type="text"
              name="last_name"
              label="Last Name"
              value={values.last_name}
              onChange={onChange}
              placeholder="last name"
              error={errors?.last_name}
              required
            />
          </div>
          <div className="col-md-6">
            <FormGroup
              type="text"
              name="middle_name"
              label="Middle Name"
              value={values.middle_name}
              onChange={onChange}
              placeholder="middle name"
              error={errors?.middle_name}
            />
          </div>
          <div className="col-md-6">
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
          </div>
          <div className="col-md-6">
            <FormGroup
              type="email"
              name="email"
              label="Email"
              value={values.email}
              onChange={onChange}
              placeholder="email@xyz.com"
              error={errors?.email}
              required
            />
          </div>
          <div className="col-md-6">
            <FormGroup
              type="text"
              name="staff_number"
              label="Staff Number"
              value={values.staff_number}
              onChange={onChange}
              placeholder="N xxx xxx"
              error={errors?.staff_number}
              required
            />
          </div>
          <div className="col-md-6">
            <FormSelect
              name="role"
              label="Role"
              value={values.role}
              onChange={onChange}
              options={roles.map((type) => {
                return { label: type, value: type };
              })}
              description="Select Role"
              error={errors?.role}
              required
            />
          </div>
          <div className="col-md-6">
            <FormGroup
              type="password"
              name="password"
              label="Password"
              value={values.password}
              onChange={onChange}
              placeholder="xxxxxxxxx"
              error={errors?.password}
              required
            />
          </div>
        </div>
        <div className="centered">
          <Button
            position="center"
            variant="green"
            type="submit"
            isLoading={isLoading}
            disabled={isLoading}
          >
            {isLoading ? 'Creating User...' : 'Create User'}
          </Button>
        </div>
      </Form>
      <div className="other-options">
        Already have an account? <Link to={links.signIn}>Sign In</Link>
      </div>
    </div>
  );
};
export default SupplierForm;
