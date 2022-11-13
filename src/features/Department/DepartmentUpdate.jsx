import { Form, Button } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import useAxios from '../../hooks/useAxios';
import { updateDepartment } from '../../services/departments';

const DepartmentUpdate = ({ theEmployee }) => {
  const { id } = theEmployee;
  const api = useAxios();
  const initialValues = {
    department_name: theEmployee.department_name,
    department_location: theEmployee.department_location,
    building: theEmployee.building,
  };
  const [values, setValues] = useState(initialValues);

  const { mutate } = useMutation((data) => updateDepartment(api, id, data), {
    onSuccess: () => {
      toast.success('Department updated successfully.', {
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
          placeholder="Name *"
          name="department_name"
          value={values.department_name}
          onChange={onChange}
          required
        />
      </Form.Group>
      <Form.Group>
        <Form.Control
          type="text"
          placeholder="Name *"
          name="department_location"
          value={values.department_location}
          onChange={onChange}
          required
        />
      </Form.Group>
      <Form.Group>
        <Form.Control
          type="text"
          placeholder="Name *"
          name="building"
          value={values.building}
          onChange={onChange}
        />
      </Form.Group>
      <Button variant="success" type="submit" block>
        Update
      </Button>
    </Form>
  );
};
DepartmentUpdate.propTypes = {
  theEmployee: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default DepartmentUpdate;
