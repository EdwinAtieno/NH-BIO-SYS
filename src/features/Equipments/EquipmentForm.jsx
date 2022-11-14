import React, { useState } from 'react';
import { Form } from 'react-bootstrap';
import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { createEquipment } from '../../services/equipments';
import Button from '../../components/buttons/Button';
import FormGroup from '../../components/forms/FormGroup';
import FormSelect from '../../components/forms/FormSelect';
import { links } from '../../utils/links';
import SupplierSelect from './SupplierSelect';
import useAxios from '../../hooks/useAxios';

const EquipmentForm = () => {
  const navigate = useNavigate();
  const api = useAxios();
  const [errors, setErrors] = useState({});
  const initialValues = {
    equipment_name: '',
    equipment_type: '',
    equipment_serial_no: '',
    equipment_model: '',
    description: '',
    status: '',
    status_remarks: '',
    department: '',
    supplier: '',
  };
  const [values, setValues] = useState(initialValues);

  const { isLoading, mutate } = useMutation(
    (data) => createEquipment(api, data),
    {
      onSuccess: () => {
        toast.success('You have created successfully.', {
          autoClose: 8000,
        });
        navigate(links.equipments);
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
    }
  );
  const model = ['lease', 'outright purchase', 'placement'];

  const status = [
    'active',
    'broken',
    'repaired',
    'out of service',
    'under maintenance',
  ];
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
            name="equipment_name"
            label="Equipment Name"
            value={values.equipment_name}
            onChange={onChange}
            placeholder="Equipment name"
            error={errors?.equipment_name}
            required
          />
        </div>
        <div className="col-md-6">
          <FormGroup
            type="text"
            name="equipment_type"
            label="Equipment Type"
            value={values.equipment_type}
            onChange={onChange}
            placeholder="equipment type"
            error={errors?.equipment_type}
            required
          />
        </div>
        <div className="col-md-6">
          <FormGroup
            type="text"
            name="equipment_serial_no"
            label="Serial Number"
            value={values.equipment_serial_no}
            onChange={onChange}
            placeholder="serial number"
            error={errors?.equipment_serial_no}
          />
        </div>
        <div className="col-md-6">
          <FormGroup
            type="text"
            name="department"
            label="Department"
            value={values.department}
            onChange={onChange}
            placeholder="Department"
            error={errors?.department}
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
            name="description"
            label="Equipment Description"
            value={values.description}
            onChange={onChange}
            placeholder="Description"
            error={errors?.description}
            required
          />
        </div>
        <div className="col-md-6">
          <FormSelect
            name="equipment_model"
            label="Mode"
            value={values.equipment_model}
            onChange={onChange}
            options={model.map((type) => {
              return { label: type, value: type };
            })}
            description="Select Mode"
            error={errors?.equipment_model}
            required
          />
        </div>
        <div className="col-md-6">
          <FormSelect
            name="status"
            label="Status"
            value={values.status}
            onChange={onChange}
            options={status.map((type) => {
              return { label: type, value: type };
            })}
            description="Select Status"
            error={errors?.status}
            required
          />
        </div>
        <div className="col-md-6">
          <FormGroup
            type="textarea"
            rows={3}
            name="status_remarks"
            label="Status Remarks"
            value={values.status_remarks}
            onChange={onChange}
            placeholder="Remarks"
            error={errors?.status_remarks}
            required
          />
        </div>
      </div>
      <div className="centered">
        <Button
          position="right"
          variant="green"
          type="submit"
          isLoading={isLoading}
          disabled={isLoading}
        >
          {isLoading ? 'Creating Equipment...' : 'Create Equipment'}
        </Button>
      </div>
    </Form>
  );
};

export default EquipmentForm;
