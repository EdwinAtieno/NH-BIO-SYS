import React, { useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import useAxios from '../../hooks/useAxios';
import { getAllUser } from '../../services/users';
import FullPageLoader from '../../components/spinners/FullPageLoader';
import ErrorMessage from '../../components/errors/ErrorMessage';

const EquipmentsData = () => {
  const api = useAxios();
  const { isLoading, isError, refetch, isFetching } = useQuery(
    ['results'],
    () => getAllUser(api)
  );
  useEffect(() => {
    refetch();
  }, []);

  if (isLoading || isFetching) {
    return (
      <div className="centered">
        <FullPageLoader />
      </div>
    );
  }
  if (isError) {
    return (
      <div className="centered">
        <ErrorMessage message="Permission Denied" />
      </div>
    );
  }

  return <div />;
};
export default EquipmentsData;
