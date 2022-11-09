import { Form, Button } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { updateUser } from '../../services/users';
import useAxios from '../../hooks/useAxios';

const EditForm = ({ theEmployee }) => {
  const { id } = theEmployee;
  const api = useAxios();
  const initialValues = {
    email: theEmployee.email,
    first_name: theEmployee.first_name,
    last_name: theEmployee.last_name,
    roles: theEmployee.roles.map((role) => role.name),
    middle_name: theEmployee.middle_name,
    staff_number: theEmployee.staff_number,
    phone_number: theEmployee.phone_number,
  };
  const [values, setValues] = useState(initialValues);
  const { mutate } = useMutation((data) => updateUser(api, id, data), {
    onSuccess: () => {
      toast.success('You have registered successfully.', {
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
          name="first_name"
          value={values.first_name}
          onChange={onChange}
          required
        />
      </Form.Group>
      <Form.Group>
        <Form.Control
          type="text"
          placeholder="Name *"
          name="last_name"
          value={values.last_name}
          onChange={onChange}
          required
        />
      </Form.Group>
      <Form.Group>
        <Form.Control
          type="text"
          placeholder="Name *"
          name="middle_name"
          value={values.middle_name}
          onChange={onChange}
        />
      </Form.Group>
      <Form.Group>
        <Form.Control
          type="text"
          placeholder="Name *"
          name="staff_number"
          value={values.staff_number}
          onChange={onChange}
          required
        />
      </Form.Group>
      <Form.Group>
        <Form.Control
          type="email"
          placeholder="Email *"
          name="email"
          value={values.email}
          onChange={onChange}
          required
        />
      </Form.Group>
      <Form.Group>
        <Form.Control
          type="text"
          placeholder="Address"
          name="phone_number"
          value={values.phone_number}
          onChange={onChange}
        />
      </Form.Group>
      <Form.Group>
        <Form.Control
          type="text"
          placeholder="Phone"
          name="roles"
          value={values.roles}
          onChange={onChange}
        />
      </Form.Group>
      <Button variant="success" type="submit" block>
        Edit Employee
      </Button>
    </Form>
  );
};

EditForm.propTypes = {
  theEmployee: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default EditForm;
