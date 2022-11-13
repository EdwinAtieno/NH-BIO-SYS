import DatalistInput from 'react-datalist-input';
import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import useAxios from '../../hooks/useAxios';
import { getContactPersons } from '../../services/contact';

const ContactPersons = () => {
  const api = useAxios();
  const [values, setValues] = useState([]);
  const { datam: contactPerson, refetch } = useQuery(['contactPerson'], () =>
    getContactPersons(api)
  );

  useEffect(() => {
    refetch();
  }, []);

  return (
    <div className="form-group">
      <DatalistInput
        placeholder="Choose Town"
        label="Town"
        value={
          contactPerson?.find((town) => town?.id === Number(values?.town))?.town
        }
        onSelect={(item) => setValues({ ...values, town: item.id })}
        items={contactPerson?.map((town) => {
          return { id: town.id, value: town.town };
        })}
      />
    </div>
  );
};

export default ContactPersons;
