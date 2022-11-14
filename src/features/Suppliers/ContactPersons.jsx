import { useQuery } from '@tanstack/react-query';
import PropTypes from 'prop-types';
import { useState } from 'react';
import useAxios from '../../hooks/useAxios';
import { getContactPersons } from '../../services/contact';
import FormSelect from '../../components/forms/FormSelect';
import ErrorMessage from '../../components/errors/ErrorMessage';

const ContactPersons = ({ errors, setErrors, values, setValues }) => {
  const [shops, setShops] = useState([]);
  const api = useAxios();
  const { isLoading, refetch } = useQuery(
    ['contactPerson'],
    () => getContactPersons(api),
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
          type="text"
          required
          name="contact_person"
          label="Contact Person"
          value={values.contact_person}
          onChange={(e) =>
            setValues({ ...values, contact_person: e.target.value.split(',') })
          }
          error={errors?.contact_person_name}
          options={shops.map((shop) => {
            return {
              label: shop?.contact_person_name,
              value: shop?.contact_person_name,
            };
          })}
          description="Choose Contact Person"
        />
      )}
      {isLoading && <div>Loading your shops...</div>}
      {errors?.contact_person_name && (
        <ErrorMessage
          withRetry
          retryAction={refetch}
          message="Failed to get info please try again"
        />
      )}
    </div>
  );
};

ContactPersons.propTypes = {
  errors: PropTypes.func.isRequired,
  values: PropTypes.func.isRequired,
  setValues: PropTypes.func.isRequired,
  setErrors: PropTypes.func.isRequired,
};

export default ContactPersons;
