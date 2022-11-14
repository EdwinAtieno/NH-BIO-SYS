import { useQuery } from '@tanstack/react-query';
import PropTypes from 'prop-types';
import { useState } from 'react';
import ErrorMessage from '../../components/errors/ErrorMessage';
import FormSelect from '../../components/forms/FormSelect';
import useAxios from '../../hooks/useAxios';
import { getSeppliers } from '../../services/suppliers';

const SupplierSelect = ({ errors, setErrors, values, setValues }) => {
  const [shops, setShops] = useState([]);
  const api = useAxios();
  const { isLoading, refetch } = useQuery(['shops'], () => getSeppliers(api), {
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
          name="supplier"
          label="Supplier"
          value={values.supplier}
          onChange={(e) => setValues({ ...values, supplier: e.target.value })}
          error={errors?.supplier_name}
          options={shops.map((shop) => {
            return { label: shop?.supplier_name, value: shop?.supplier_name };
          })}
          description="Select supplier"
        />
      )}
      {isLoading && <div>Loading your shops...</div>}
      {errors?.supplier_name && (
        <ErrorMessage
          withRetry
          retryAction={refetch}
          message="Failed to get section please try again"
        />
      )}
    </div>
  );
};

SupplierSelect.propTypes = {
  errors: PropTypes.func.isRequired,
  values: PropTypes.func.isRequired,
  setValues: PropTypes.func.isRequired,
  setErrors: PropTypes.func.isRequired,
};

export default SupplierSelect;
