import React, { useState } from 'react';
import { Form } from 'react-bootstrap';
import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { createSupplier } from '../../services/suppliers';
import Button from '../../components/buttons/Button';
import FormGroup from '../../components/forms/FormGroup';
import { links } from '../../utils/links';
import ContactPersons from './ContactPersons';

const SupplierForm = () => {
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});
  const initialValues = {
    supplier_name: '',
    supplier_address: '',
    supplier_contact: '',
    supplier_email: '',
    supplier_website: '',
    supplier_remarks: '',
    contact_person: '',
  };
  const [values, setValues] = useState(initialValues);

  const { isLoading, mutate } = useMutation((data) => createSupplier(data), {
    onSuccess: () => {
      toast.success('Supplier registered successfully.', {
        autoClose: 8000,
      });
      navigate(links.suppliers);
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
  const onChange = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();
    mutate(values);
  };

  return (
    <Form className="auth-form__form" onSubmit={onSubmitHandler}>
      <div className="row">
        <div className="col-md-6">
          <FormGroup
            type="text"
            name="supplier_name"
            label="Full Names"
            value={values.supplier_name}
            onChange={onChange}
            placeholder="full names"
            error={errors?.supplier_name}
            required
          />
        </div>
        <div className="col-md-6">
          <FormGroup
            type="text"
            name="supplier_address"
            label="Address"
            value={values.supplier_address}
            onChange={onChange}
            placeholder="Address"
            error={errors?.supplier_address}
            required
          />
        </div>
        <div className="col-md-6">
          <FormGroup
            type="text"
            name="supplier_website"
            label="Website"
            value={values.supplier_website}
            onChange={onChange}
            placeholder="www.xyz.com"
            error={errors?.supplier_website}
          />
        </div>
        <div className="col-md-6">
          <FormGroup
            type="number"
            name="supplier_contact"
            label="Phone Number"
            value={values.supplier_contact}
            onChange={onChange}
            placeholder="254 xxx xxx xxx"
            error={errors?.supplier_contact}
            required
          />
        </div>
        <div className="col-md-6">
          <FormGroup
            type="email"
            name="supplier_email"
            label="Email"
            value={values.supplier_email}
            onChange={onChange}
            placeholder="email@xyz.com"
            error={errors?.supplier_email}
            required
          />
        </div>
        <div className="col-md-6">
          <FormGroup
            as="textarea"
            rows={3}
            name="supplier_remarks"
            label="More Information"
            value={values.supplier_remarks}
            onChange={onChange}
            placeholder="More information about the supplier"
            error={errors?.supplier_remarks}
            required
          />
        </div>
        <div className="col-md-6">
          <ContactPersons
            values={values}
            setValues={setValues}
            errors={errors}
            setErrors={setErrors}
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
  );
};
export default SupplierForm;
