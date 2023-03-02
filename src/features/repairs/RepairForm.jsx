import { useQuery } from '@tanstack/react-query';
import React, { useEffect } from 'react';
import {
  MDBBadge,
  MDBBtn,
  MDBTable,
  MDBTableBody,
  MDBTableHead,
} from 'mdb-react-ui-kit';

import { getAllUser } from '../../services/users';
import FullPageLoader from '../../components/spinners/FullPageLoader';
import ErrorMessage from '../../components/errors/ErrorMessage';
import useAxios from '../../hooks/useAxios';
import './repair.scss';

const RepairForm = () => {
  const api = useAxios();
  const { data, isLoading, isError, refetch, isFetching } = useQuery(
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
  return (
    <div className="listContainer">
      <div className="listTitle"> Users in the database</div>
      <MDBTable align="middle">
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
      </MDBTable>
    </div>
  );
};

export default RepairForm;
