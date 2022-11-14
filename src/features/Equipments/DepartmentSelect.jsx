import { useQuery } from '@tanstack/react-query';
import PropTypes from 'prop-types';
import { Form } from 'react-bootstrap';
import { useState } from 'react';
import ErrorMessage from '../../components/errors/ErrorMessage';
import FormSelect from '../../components/forms/FormSelect';
import useAxios from '../../hooks/useAxios';
import FormGroup from '../../components/forms/FormGroup';
import { getDepartments } from '../../services/departments';

const SectionSelect = ({ errors, setErrors, values, setValues }) => {
  const [shops, setShops] = useState([]);
  const api = useAxios();
  const { isLoading, refetch } = useQuery(
    ['shops'],
    () => getDepartments(api),
    {
      onSuccess: (data) => {
        const errorState = { ...errors };
        delete errorState.shop;
        setErrors(errorState);
        setShops(data);
      },

      onError: () => {
        setErrors({ ...errors, shop_id: 'Failed to fetch shops' });
      },
    }
  );
  return (
    <div>
      {' '}
      {shops && (
        <FormSelect
          as="select"
          required
          name="department"
          label="department"
          value={values.department}
          onChange={(e) => setValues({ ...values, sections: e.target.value })}
          error={errors?.department_name}
          options={shops.map((shop) => {
            return {
              label: shop?.department_name,
              value: shop?.department_name,
            };
          })}
          description="Choose department"
        />
      )}
      {isLoading && <div>Loading your shops...</div>}
      {errors?.section_name && (
        <ErrorMessage
          withRetry
          retryAction={refetch}
          message="Failed to get section please try again"
        />
      )}
    </div>
  );
};

SectionSelect.propTypes = {
  errors: PropTypes.func.isRequired,
  values: PropTypes.func.isRequired,
  setValues: PropTypes.func.isRequired,
  setErrors: PropTypes.func.isRequired,
};

export default SectionSelect;
