import { useQuery } from '@tanstack/react-query';
import PropTypes from 'prop-types';
import { useState } from 'react';
import ErrorMessage from '../../components/errors/ErrorMessage';
import useAxios from '../../hooks/useAxios';
import FormGroup from '../../components/forms/FormGroup';
import { getEquipments } from '../../services/equipments';
import FormSelect from '../../components/forms/FormSelect';

const SectionSelect = ({ errors, setErrors, values, setValues }) => {
  const [shops, setShops] = useState([]);
  const api = useAxios();
  const { isLoading, refetch } = useQuery(['shops'], () => getEquipments(api), {
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
        <FormSelect
          type="text"
          required
          name="equipment"
          label="Equipment"
          value={values.equipment}
          onChange={(e) =>
            setValues({ ...values, equipment: e.target.value.split(',') })
          }
          error={errors?.section_name}
          options={shops.map((shop) => {
            return { label: shop?.asset_number, value: shop?.asset_number };
          })}
          description="Choose asset number"
        />
      )}
      {isLoading && <div>Loading your shops...</div>}
      {errors?.asset_number && (
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
