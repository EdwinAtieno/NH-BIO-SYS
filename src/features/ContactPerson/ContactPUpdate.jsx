import { Form, Button } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import useAxios from '../../hooks/useAxios';
import { updateContactPerson } from '../../services/contact';

const ContactPUpdate = ({ theEmployee }) => {
  const { id } = theEmployee;
  const api = useAxios();
  const initialValues = {
    contact_person_name: theEmployee.contact_person_name,
    contact_person_email: theEmployee.contact_person_email,
    contact_person_phone_number: theEmployee.contact_person_phone_number,
    contact_person_address: theEmployee.contact_person_address,
  };
  const [values, setValues] = useState(initialValues);

  const { mutate } = useMutation((data) => updateContactPerson(api, id, data), {
    onSuccess: () => {
      toast.success('Information Updated successfully.', {
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
          placeholder="Full Names *"
          name="contact_person_name"
          value={values.contact_person_name}
          onChange={onChange}
          required
        />
      </Form.Group>
      <Form.Group>
        <Form.Control
          type="email"
          placeholder="Email *"
          name="contact_person_email"
          value={values.contact_person_email}
          onChange={onChange}
          required
        />
      </Form.Group>
      <Form.Group>
        <Form.Control
          type="text"
          placeholder="Phone Number *"
          name="contact_person_phone_number"
          value={values.contact_person_phone_number}
          onChange={onChange}
        />
      </Form.Group>
      <Form.Group>
        <Form.Control
          type="text"
          placeholder="Home Address *"
          name="contact_person_address"
          value={values.contact_person_address}
          onChange={onChange}
          required
        />
      </Form.Group>
      <Button variant="success" type="submit" block>
        Save Changes
      </Button>
    </Form>
  );
};

ContactPUpdate.propTypes = {
  theEmployee: PropTypes.arrayOf(PropTypes.string).isRequired,
};
export default ContactPUpdate;
