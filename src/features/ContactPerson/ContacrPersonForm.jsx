import React, { useState } from 'react';
import { Form } from 'react-bootstrap';
import { useMutation } from '@tanstack/react-query';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { createContactPerson } from '../../services/contact';
import Button from '../../components/buttons/Button';
import FormGroup from '../../components/forms/FormGroup';
import { links } from '../../utils/links';
import useAxios from '../../hooks/useAxios';

const ContacrPersonForm = () => {
  const navigate = useNavigate();
  const api = useAxios();
  const [errors, setErrors] = useState({});
  const initialValues = {
    contact_person_email: '',
    contact_person_name: '',
    contact_person_address: '',
    contact_person_phone_number: '',
  };
  const [values, setValues] = useState(initialValues);

  const { isLoading, mutate } = useMutation(
    (data) => createContactPerson(api, data),
    {
      onSuccess: () => {
        toast.success('Contact person registered successfully.', {
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
          setErrors({ form: 'Invalid details' });
          return;
        }
        toast.error('Oh snap! Something went wrong!');
      },
    }
  );

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
            name="contact_person_name"
            label="Full Names"
            value={values.contact_person_name}
            onChange={onChange}
            placeholder="Full name"
            error={errors?.contact_person_name}
            required
          />
        </div>
        <div className="col-md-6">
          <FormGroup
            as="textarea"
            rows={3}
            name="contact_person_address"
            label="Address"
            value={values.contact_person_address}
            onChange={onChange}
            placeholder="Address"
            error={errors?.contact_person_address}
            required
          />
        </div>
        <div className="col-md-6">
          <FormGroup
            type="number"
            name="contact_person_phone_number"
            label="Phone Number"
            value={values.contact_person_phone_number}
            onChange={onChange}
            placeholder="254 xxx xxx xxx"
            error={errors?.contact_person_phone_number}
            required
          />
        </div>
        <div className="col-md-6">
          <FormGroup
            type="email"
            name="contact_person_email"
            label="Email"
            value={values.contact_person_email}
            onChange={onChange}
            placeholder="email@xyz.com"
            error={errors?.contact_person_email}
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
          {isLoading ? 'Creating ...' : 'Create contact person'}
        </Button>
      </div>
    </Form>
  );
};
export default ContacrPersonForm;
