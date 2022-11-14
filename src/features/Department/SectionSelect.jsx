import { useQuery } from '@tanstack/react-query';
import PropTypes from 'prop-types';
import { Form } from 'react-bootstrap';
import { useState } from 'react';
import ErrorMessage from '../../components/errors/ErrorMessage';
import FormSelect from '../../components/forms/FormSelect';
import useAxios from '../../hooks/useAxios';
import { getSections } from '../../services/sections';
import FormGroup from '../../components/forms/FormGroup';

const SectionSelect = ({ errors, setErrors, values, setValues }) => {
  const [shops, setShops] = useState([]);
  const api = useAxios();
  const { isLoading, refetch } = useQuery(['shops'], () => getSections(api), {
    onSuccess: (data) => {
      const errorState = { ...errors };
      delete errorState.shop;
      setErrors(errorState);
      setShops(data);
    },

    onError: () => {
      setErrors({ ...errors, shop_id: 'Failed to fetch shops' });
    },
  });
  return (
    <div>
      {' '}
      {shops && (
        <FormGroup
          type="text"
          required
          name="sections"
          label="sections"
          value={values.sections}
          onChange={(e) =>
            setValues({ ...values, sections: e.target.value.split(',') })
          }
          error={errors?.section_name}
          options={shops.map((shop) => {
            return { label: shop?.section_name, value: shop?.section_name };
          })}
          description="Choose section in the department"
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
