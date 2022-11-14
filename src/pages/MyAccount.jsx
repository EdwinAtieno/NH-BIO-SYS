import { useQuery } from '@tanstack/react-query';
import { Button, Modal, Stack } from 'react-bootstrap';
import React, { useState } from 'react';
import ErrorMessage from '../components/errors/ErrorMessage';
import Loader from '../components/loaders/Loader';
import useAuth from '../hooks/useAuth';
import useAxios from '../hooks/useAxios';
import { getUser } from '../services/users';
import PrimaryLayout from '../layouts/PrimaryLayout';
import EditForm from '../features/users/EditForm';

const MyAccount = () => {
  const api = useAxios();
  const { user } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const { data, isLoading, isError, refetch } = useQuery(['profile'], () =>
    getUser(api, user?.user_id)
  );
  if (isError) {
    return (
      <div className="centered">
        <ErrorMessage
          message="Failed to get user details"
          withRetry
          retryAction={refetch}
        />
      </div>
    );
  }

  const onEditStudent = () => {
    setIsEditing(true);
  };
  const resetEditing = () => {
    setIsEditing(false);
  };

  return (
    <PrimaryLayout>
      <div>
        {isLoading ? (
          <div className="centered" style={{ backgroundColor: 'green' }}>
            <Loader />
          </div>
        ) : (
          <div>
            <Stack>
              <div className="d-flex justify-content-center flex-column align-items-center">
                <div className="rounded-circle fs-1 p-4 bg-primary text-white">
                  {data?.first_name[0]}
                  {data?.last_name[0]}
                </div>
                <h1 className="my-2">
                  {data?.first_name} {data?.middle_name} {data?.last_name}
                </h1>
              </div>
              <div className="py-3 px-1">
                <h5 className="text-muted-alt opacity-50 border-bottom border-dark pb-2">
                  Personal Information
                </h5>
                <p>
                  <span className="fw-light">First Name:</span>{' '}
                  {data?.first_name}
                </p>
                <p>
                  <span className="fw-light">Middle Name:</span>{' '}
                  {data?.middle_name}
                </p>
                <p>
                  <span className="fw-light">Last Name:</span> {data?.last_name}
                </p>
                <p>
                  <span className="fw-light">Email:</span> {data?.email}
                </p>
                <p>
                  <span className="fw-light">Roles:</span>
                  {data?.roles}
                </p>
              </div>
              <div className="py-3 px-1">
                <h5 className="text-muted-alt opacity-50 border-bottom border-dark pb-2">
                  Contact Information
                </h5>
                <p>
                  <span className="fw-light">Phone Number:</span> +
                  {data?.phone_number}
                </p>
                <p>
                  <span className="fw-light">Alternate Phone Number:</span>{' '}
                  {data?.alternate_phone_number && '+'}{' '}
                  {data?.alternate_phone_number}
                </p>
              </div>
            </Stack>
            <Button onClick={onEditStudent}>Edit information</Button>
          </div>
        )}
        <Modal show={isEditing} onHide={resetEditing}>
          <Modal.Header closeButton>
            <Modal.Title>Edit Employee</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <EditForm theEmployee={user} />
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={resetEditing}>
              Close Button
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </PrimaryLayout>
  );
};
export default MyAccount;
