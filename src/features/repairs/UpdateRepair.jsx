import { Form, Button } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import useAxios from '../../hooks/useAxios';
import { updateRepair } from '../../services/repairs';

const UpdateRepair = ({ theEmployee }) => {
  const { id } = theEmployee;
  const api = useAxios();
  const initialValues = {
    equipment: theEmployee.equipment,
    supplier: theEmployee.supplier,
    repair_date: theEmployee.repair_date,
    repair_cost: theEmployee.repair_cost,
    repair_description: theEmployee.repair_description,
  };
  const [values, setValues] = useState(initialValues);

  const { mutate } = useMutation((data) => updateRepair(api, id, data), {
    onSuccess: () => {
      toast.success('Details updated successfully.', {
        autoClose: 8000,
      });
    },
  });
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
          type="text"
          placeholder="equipment *"
          name="equipment"
          value={values.equipment}
          onChange={onChange}
          required
        />
      </Form.Group>
      <Form.Group>
        <Form.Control
          type="text"
          placeholder="supplier *"
          name="supplier"
          value={values.supplier}
          onChange={onChange}
          required
        />
      </Form.Group>
      <Form.Group>
        <Form.Control
          type="date"
          placeholder="repair_date *"
          name="repair_date"
          value={values.repair_date}
          onChange={onChange}
        />
      </Form.Group>
      <Form.Group>
        <Form.Control
          type="text"
          placeholder="repair cost *"
          name="repair_cost"
          value={values.repair_cost}
          onChange={onChange}
          required
        />
      </Form.Group>
      <Form.Group>
        <Form.Control
          as="textarea"
          rows={3}
          placeholder="repair description *"
          name="repair_description"
          value={values.repair_description}
          onChange={onChange}
          required
        />
      </Form.Group>
      <Button variant="success" type="submit" block>
        Update
      </Button>
    </Form>
  );
};

UpdateRepair.propTypes = {
  theEmployee: PropTypes.arrayOf(PropTypes.string).isRequired,
};
export default UpdateRepair;
