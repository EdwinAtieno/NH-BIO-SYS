import React, { useMemo, useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import TableForm from '../../components/tables/TableForm';
import useAxios from '../../hooks/useAxios';
import { getAllUser } from '../../services/users';
import FullPageLoader from '../../components/spinners/FullPageLoader';
import ErrorMessage from '../../components/errors/ErrorMessage';

const EquipmentsData = () => {
  const api = useAxios();
  const { data, isLoading, isError, refetch, isFetching } = useQuery(
    ['results'],
    () => getAllUser(api)
  );
  useEffect(() => {
    refetch();
  }, []);
  const columns = useMemo(
    () => [
      {
        // first group - TV Show
        Header: 'TV Show',
        // First group columns
        columns: [
          {
            Header: 'User Id',
            accessor: 'id',
          },

          {
            Header: 'First Name',
            accessor: 'first_name',
          },
        ],
      },
      {
        // Second group - Details
        Header: 'Last Name',
        // Second group columns
        columns: [
          {
            Header: 'Last Name',
            accessor: 'last_name',
          },
          {
            Header: 'Staff Number',
            accessor: 'staff_number',
          },
          {
            Header: 'Role',
            accessor: 'roles',
          },
          {
            Header: 'Phone Number',
            accessor: 'phone_number',
          },
          {
            Header: 'email',
            accessor: 'email',
          },
        ],
      },
    ],
    []
  );
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

  return (
    <div>
      <TableForm columns={columns} data={data.results} />
    </div>
  );
};
export default EquipmentsData;
