import React, { useState } from 'react';
import { Form } from 'react-bootstrap';
import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { createSection } from '../../services/sections';
import Button from '../../components/buttons/Button';
import FormGroup from '../../components/forms/FormGroup';
import FormSelect from '../../components/forms/FormSelect';
import { links } from '../../utils/links';
import useAxios from '../../hooks/useAxios';

const SectionForm = () => {
  const api = useAxios();
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});
  const initialValues = {
    section_name: '',
    specialization: '',
  };
  const [values, setValues] = useState(initialValues);

  const { isLoading, mutate } = useMutation(
    (data) => createSection(api, data),
    {
      onSuccess: () => {
        toast.success('Section created successfully.', {
          autoClose: 8000,
        });
        navigate(links.departments);
      },
      onError: (error) => {
        if (error?.response?.status === 400) {
          setErrors(error?.response?.data);
          return;
        }

        if (error?.response?.status === 401) {
          setErrors({ form: 'Invalid data' });
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
    <Form className="auth-form__form" onSubmit={onSubmitHandler} clear>
      <div className="row">
        <div className="col-md-6">
          <FormGroup
            type="text"
            name="section_name"
            label="Section Name"
            value={values.section_name}
            onChange={onChange}
            placeholder="Section name"
            error={errors?.section_name}
            required
          />
        </div>
        <div className="col-md-6">
          <FormGroup
            as="textarea"
            rows={3}
            name="specialization"
            label="Specialization"
            value={values.specialization}
            onChange={onChange}
            placeholder="Specialization"
            error={errors?.specialization}
          />
        </div>
      </div>
      <div className="centered">
        <Button
          position="center"
          variant="blue"
          type="submit"
          isLoading={isLoading}
          disabled={isLoading}
        >
          {isLoading ? 'Creating Section...' : 'Create Section'}
        </Button>
      </div>
    </Form>
  );
};
export default SectionForm;
