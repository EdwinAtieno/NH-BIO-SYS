/* eslint-disable react/jsx-props-no-spreading */
import { useQuery } from '@tanstack/react-query';
import React, { useEffect } from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import 'bootstrap/dist/css/bootstrap.css';
import filterFactory, { textFilter } from 'react-bootstrap-table2-filter';
import 'react-bootstrap-table2-filter/dist/react-bootstrap-table2-filter.min.css';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.css';
import { getAllUser } from '../../services/users';
import FullPageLoader from '../../components/spinners/FullPageLoader';
import ErrorMessage from '../../components/errors/ErrorMessage';
import useAxios from '../../hooks/useAxios';
import '../repairs/repair.scss';

const UsersForm = () => {
  const api = useAxios();
  const { data, isLoading, isError, refetch, isFetching } = useQuery(
    ['results'],
    () => getAllUser(api)
  );

  useEffect(() => {
    refetch();
  }, []);

  const columns = [
    { dataField: 'id', text: 'Id' },
    {
      dataField: 'first_name',
      text: 'First Name',
      sort: true,
      filter: textFilter(),
    },
    { dataField: 'last_name', text: 'Last Name', sort: true },
    {
      dataField: 'staff_number',
      text: 'Staff Number',
      sort: true,
      filter: textFilter(),
    },
    { dataField: 'roles', text: 'Roles' },
    { dataField: 'phone_number', text: 'Phone Number' },
    { dataField: 'email', text: 'Phone Number', sort: true },
  ];

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
    <div className="listContainer">
      <BootstrapTable
        bootstrap4
        keyField="id"
        data={data}
        columns={columns}
        filter={filterFactory()}
        striped
        hover
        condensed
      />
    </div>
  );
};
export default UsersForm;
