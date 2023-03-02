import { Form, Modal } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { useState } from 'react';
import Button from '../../components/buttons/Button';
import FormGroup from '../../components/forms/FormGroup';
import useAxios from '../../hooks/useAxios';

const AddRegionModal = ({ values, setValues, show, setShow }) => {
  const [errors, setErrors] = useState();
  const api = useAxios();

  const addRegion = async (data) => {
    const response = await api.post('/regions/', data);
    return response.data;
  };

  const onChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const { isLoading, mutate } = useMutation(addRegion, {
    onSuccess: () => {
      toast.success('Region added successfully');
      setShow(false);
    },

    onError: (error) => {
      if (error?.response?.status === 400) {
        setErrors(error?.response?.data);
        return;
      }
      toast.error('Oh snap! Something went wrong!');
    },
  });

  const onSubmit = (e) => {
    e.preventDefault();
    mutate(values);
  };

  const handleClose = () => {
    setShow(false);
    setValues({
      region: '',
      paths: [],
    });
  };

  return (
    <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false}>
      <Modal.Header closeButton>
        <Modal.Title>Add a new Region</Modal.Title>
      </Modal.Header>
      <Form onSubmit={onSubmit}>
        <Modal.Body>
          <FormGroup
            name="region"
            label="Region Name"
            value={values.region}
            required
            placeholder="Enter region name"
            onChange={onChange}
            error={errors?.region}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button type="button" variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button
            variant="green"
            type="submit"
            isLoading={isLoading}
            disabled={isLoading}
          >
            {isLoading ? 'Adding...' : 'Add Region'}
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

const valuesShape = {
  region: PropTypes.string.isRequired,
  paths: PropTypes.string.isRequired,
};

AddRegionModal.propTypes = {
  values: PropTypes.shape(valuesShape).isRequired,
  setValues: PropTypes.func.isRequired,
  show: PropTypes.bool.isRequired,
  setShow: PropTypes.func.isRequired,
};

export default AddRegionModal;
