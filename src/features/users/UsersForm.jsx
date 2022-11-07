import { useQuery } from '@tanstack/react-query';
import React, { useEffect, useState } from 'react';
import {
  MDBBadge,
  MDBBtn,
  MDBTable,
  MDBTableBody,
  MDBTableHead,
} from 'mdb-react-ui-kit';
import BootstrapTable from 'react-bootstrap-table-next';
import 'bootstrap/dist/css/bootstrap.css';

import 'react-bootstrap-table-next/dist/react-bootstrap-table2.css';
import paginationFactory from 'react-bootstrap-table2-paginator';
import 'react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css';
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

  const columns = [
    { dataField: 'id', text: 'Id' },
    { dataField: 'first_name', text: 'First Name', sort: true },
    { dataField: 'last_name', text: 'Last Name', sort: true },
    { dataField: 'staff_number', text: 'Staff Number', sort: true },
    { dataField: 'roles', text: 'Roles' },
    { dataField: 'phone_number', text: 'Phone Number' },
    { dataField: 'email', text: 'Phone Number', sort: true },
  ];

  const pagination = paginationFactory({
    page: 1,
    sizePerPage: 5,
    lastPageText: '>>',
    firstPageText: '<<',
    nextPageText: '>',
    prePageText: '<',
    showTotal: true,
    alwaysShowAllBtns: true,
    onPageChange: (page, sizePerPage) => {
      console.log('page', page);
      console.log('sizePerPage', sizePerPage);
    },
    onSizePerPageChange: (page, sizePerPage) => {
      console.log('page', page);
      console.log('sizePerPage', sizePerPage);
    },
  });

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
  return (
    <div className="listContainer">
      <div className="listTitle"> Users in the database</div>
      <BootstrapTable
        bootstrap4
        keyField="id"
        data={data}
        columns={columns}
        pagination={pagination}
      />

      {/* <MDBTable align="middle">
        <MDBTableHead>
          <tr>
            <th scope="col">User Id</th>
            <th scope="col">First Name</th>
            <th scope="col">Last Name</th>
            <th scope="col">Staff Number</th>
            <th scope="col">Role</th>
            <th scope="col">Phone Number</th>
            <th scope="col">Email</th>
            <th scope="col">Actions</th>
          </tr>
        </MDBTableHead>
        <MDBTableBody>
          {data?.results.map((results) => (
            <tr>
              <td>{results?.id}</td>
              <td>{results?.first_name}</td>
              <td>{results?.last_name}</td>
              <td>
                <MDBBadge color="success" pill>
                  {results?.staff_number}
                </MDBBadge>
              </td>
              <td>{results?.roles}</td>
              <td>{results?.phone_number}</td>
              <td>{results?.email}</td>
              <td>
                <MDBBtn color="link" rounded size="sm">
                  Edit
                </MDBBtn>
              </td>
            </tr>
          ))}
        </MDBTableBody>
      </MDBTable> */}
    </div>
  );
};

export default UsersForm;
