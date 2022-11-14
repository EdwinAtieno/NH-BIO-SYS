import { Form, Button } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import useAxios from '../../hooks/useAxios';
import { updateSection } from '../../services/sections';

const SectionUpdate = ({ theEmployee }) => {
  const { id } = theEmployee;
  const api = useAxios();
  const initialValues = {
    section_name: theEmployee.section_name,
    specialization: theEmployee.specialization,
  };
  const [values, setValues] = useState(initialValues);

  const { mutate } = useMutation((data) => updateSection(api, id, data), {
    onSuccess: () => {
      toast.success('Updated successfully.', {
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
          placeholder="section name *"
          name="section_name"
          value={values.section_name}
          onChange={onChange}
          required
        />
      </Form.Group>
      <Form.Group>
        <Form.Control
          type="text"
          placeholder="specialization *"
          name="specialization"
          value={values.specialization}
          onChange={onChange}
          required
        />
      </Form.Group>
      <Button variant="success" type="submit" block>
        Update Section
      </Button>
    </Form>
  );
};

SectionUpdate.propTypes = {
  theEmployee: PropTypes.arrayOf(PropTypes.string).isRequired,
};
export default SectionUpdate;
