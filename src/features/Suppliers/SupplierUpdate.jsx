import { Form, Button } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { useMutation, useQuery } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import useAxios from '../../hooks/useAxios';
import { updateSupplier } from '../../services/suppliers';
import { getContactPersons } from '../../services/contact';

const SupplierUpdate = ({ theEmployee }) => {
  const { id } = theEmployee;
  const api = useAxios();
  const initialValues = {
    supplier_name: theEmployee.supplier_name,
    supplier_address: theEmployee.supplier_address,
    supplier_contact: theEmployee.supplier_contact,
    supplier_email: theEmployee.supplier_email,
    supplier_website: theEmployee.supplier_website,
    supplier_remarks: theEmployee.supplier_remarks,
    contact_person: theEmployee.contact_person,
  };
  const [values, setValues] = useState(initialValues);

  const { mutate } = useMutation((data) => updateSupplier(api, id, data), {
    onSuccess: () => {
      toast.success('Suppliers details updated successfully.', {
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
          name="supplier_name"
          value={values.supplier_name}
          onChange={onChange}
          required
        />
      </Form.Group>
      <Form.Group>
        <Form.Control
          type="text"
          placeholder="Name *"
          name="supplier_address"
          value={values.supplier_address}
          onChange={onChange}
          required
        />
      </Form.Group>
      <Form.Group>
        <Form.Control
          type="phone"
          placeholder="Name *"
          name="supplier_contact"
          value={values.supplier_contact}
          onChange={onChange}
        />
      </Form.Group>
      <Form.Group>
        <Form.Control
          type="email"
          placeholder="Name *"
          name="supplier_email"
          value={values.supplier_email}
          onChange={onChange}
          required
        />
      </Form.Group>
      <Form.Group>
        <Form.Control
          type="text"
          placeholder="Website *"
          name="supplier_website"
          value={values.supplier_website}
          onChange={onChange}
          required
        />
      </Form.Group>
      <Form.Group>
        <Form.Control
          as="textarea"
          rows={3}
          placeholder="Remarks"
          name="supplier_remarks"
          value={values.supplier_remarks}
          onChange={onChange}
        />
      </Form.Group>
      <Form.Group>
        <Form.Control
          type="text"
          placeholder="Remarks"
          name="contact_person"
          value={values.contact_person}
          onChange={onChange}
        />
      </Form.Group>
      <Button variant="success" type="submit" block>
        Edit Supplier
      </Button>
    </Form>
  );
};

SupplierUpdate.propTypes = {
  theEmployee: PropTypes.arrayOf(PropTypes.string).isRequired,
};
export default SupplierUpdate;
