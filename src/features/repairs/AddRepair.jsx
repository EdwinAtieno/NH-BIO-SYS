import React, { useState } from 'react';
import { Form } from 'react-bootstrap';
import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { createRepair } from '../../services/repairs';
import Button from '../../components/buttons/Button';
import FormGroup from '../../components/forms/FormGroup';
import { links } from '../../utils/links';
import useAxios from '../../hooks/useAxios';
import SupplierSelect from '../Equipments/SupplierSelect';

const AddRepair = () => {
  const api = useAxios();
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});
  const initialValues = {
    equipment: '',
    supplier: '',
    repair_date: '',
    repair_cost: '',
    repair_description: '',
  };
  const [values, setValues] = useState(initialValues);

  const { isLoading, mutate } = useMutation((data) => createRepair(api, data), {
    onSuccess: () => {
      toast.success('Repair registered successfully.', {
        autoClose: 8000,
      });
      navigate(links.repairs);
    },
    onError: (error) => {
      if (error?.response?.status === 400) {
        setErrors(error?.response?.data);
        return;
      }

      if (error?.response?.status === 401) {
        setErrors({ form: 'Invalid information' });
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
            name="equipment"
            label="Asset Number"
            value={values.equipment}
            onChange={onChange}
            placeholder="Asset Number"
            error={errors?.equipment}
            required
          />
        </div>
        <div className="col-md-6">
          <SupplierSelect
            values={values}
            setValues={setValues}
            errors={errors}
            setErrors={setErrors}
          />
        </div>
        <div className="col-md-6">
          <FormGroup
            as="textarea"
            rows={3}
            name="repair_description"
            label="Repair Description"
            value={values.repair_description}
            onChange={onChange}
            placeholder="Description"
            error={errors?.repair_description}
            required
          />
        </div>
        <div className="col-md-6">
          <FormGroup
            type="number"
            name="repair_cost"
            label="Repair Cost"
            value={values.repair_cost}
            onChange={onChange}
            placeholder="cost"
            error={errors?.repair_cost}
            required
          />
        </div>
        <div className="col-md-6">
          <FormGroup
            type="date"
            name="repair_date"
            label="Repaired On"
            value={values.repair_date}
            onChange={onChange}
            placeholder="yyyy-mm-dd"
            error={errors?.repair_date}
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
          {isLoading ? 'Creating repair...' : 'Create Repair'}
        </Button>
      </div>
    </Form>
  );
};
export default AddRepair;
