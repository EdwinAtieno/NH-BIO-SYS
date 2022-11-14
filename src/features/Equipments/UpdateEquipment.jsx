import { Form, Button } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import useAxios from '../../hooks/useAxios';
import { updateEquipmentStatus } from '../../services/equipments';

const UpdateEquipment = ({ theEmployee }) => {
  const api = useAxios();
  const initialValues = {
    asset_number: theEmployee.asset_number,
    status: theEmployee.status,
    status_remarks: theEmployee.status_remarks,
    transfer_to: theEmployee.transfer_to,
  };
  const [values, setValues] = useState(initialValues);

  const { mutate } = useMutation(
    (data) => updateEquipmentStatus(api, theEmployee.asset_number, data),
    {
      onSuccess: () => {
        toast.success('Status Updated.', {
          autoClose: 8000,
        });
      },
    }
  );
  const onChange = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // compare input values with theEmployee, use array.filter() to get the values that are different and then create an array and pass it to the mutate function
    const difference = Object.keys(values).reduce((diff, key) => {
      if (values[key] === theEmployee[key]) return diff;
      return {
        ...diff,
        [key]: values[key],
      };
    }, {});
    mutate(difference);
  };
  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group>
        <Form.Control
          as="textarea"
          rows={3}
          placeholder="Remarks"
          name="status_remarks"
          value={values.status_remarks}
          onChange={onChange}
        />
      </Form.Group>
      <Form.Group>
        <Form.Control
          as="textarea"
          rows={3}
          placeholder="Remarks"
          name="asset_number"
          value={values.asset_number}
          onChange={onChange}
        />
      </Form.Group>
      <Form.Group>
        <Form.Control
          type="text"
          placeholder="Transfer"
          name="transfer_to"
          value={values.transfer_to}
          onChange={onChange}
        />
      </Form.Group>
      <Form.Group>
        <Form.Select name="status" onChange={onChange}>
          <option>{values.status}</option>
          <option>active</option>
          <option>repaired</option>
          <option>broken</option>
          <option>out of service</option>
          <option>under maintenance</option>
        </Form.Select>
      </Form.Group>
      <Button variant="success" type="submit" block>
        Update Status
      </Button>
    </Form>
  );
};

UpdateEquipment.propTypes = {
  theEmployee: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default UpdateEquipment;
