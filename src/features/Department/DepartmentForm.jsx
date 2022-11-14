import React, { useState } from 'react';
import { Form } from 'react-bootstrap';
import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { createDepartment } from '../../services/departments';
import Button from '../../components/buttons/Button';
import FormGroup from '../../components/forms/FormGroup';
import SectionSelect from './SectionSelect';
import { links } from '../../utils/links';
import useAxios from '../../hooks/useAxios';

const DepartmentForm = () => {
  const api = useAxios();
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});
  const initialValues = {
    department_name: '',
    department_location: '',
    building: '',
    sections: [],
  };
  const [values, setValues] = useState(initialValues);

  const { isLoading, mutate } = useMutation(
    (data) => createDepartment(api, data),
    {
      onSuccess: () => {
        toast.success('Department created successfully.', {
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
          setErrors({ form: 'Invalid Section' });
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
            name="department_name"
            label="Department Name"
            value={values.department_name}
            onChange={onChange}
            placeholder="Department Name"
            error={errors?.department_name}
            required
          />
        </div>
        <div className="col-md-6">
          <FormGroup
            type="text"
            name="department_location"
            label="Department Location"
            value={values.department_location}
            onChange={onChange}
            placeholder="Department Location"
            error={errors?.department_location}
            required
          />
        </div>
        <div className="col-md-6">
          <FormGroup
            type="text"
            name="building"
            label="Building Name"
            value={values.building}
            onChange={onChange}
            placeholder="Building name"
            error={errors?.building}
          />
        </div>
        <div className="col-md-6">
          <SectionSelect
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
          variant="yellow"
          type="submit"
          isLoading={isLoading}
          disabled={isLoading}
        >
          {isLoading ? 'Creating Department...' : 'Create New Department'}
        </Button>
      </div>
    </Form>
  );
};
export default DepartmentForm;
