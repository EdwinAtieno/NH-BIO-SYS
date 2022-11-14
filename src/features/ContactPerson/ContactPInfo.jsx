/* eslint-disable react/jsx-props-no-spreading */
import { useQuery, useMutation } from '@tanstack/react-query';
import React, { useEffect, useRef, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import { message, Space, Table } from 'antd';
import { Modal, Button } from 'react-bootstrap';
import 'antd/dist/antd.min.css';
import {
  FilePdfOutlined,
  EditOutlined,
  DeleteOutlined,
} from '@ant-design/icons';
import { useReactToPrint } from 'react-to-print';
import { CSVLink } from 'react-csv';
import { toast } from 'react-toastify';
import { deleteContactPerson, getContactPersons } from '../../services/contact';
import FullPageLoader from '../../components/spinners/FullPageLoader';
import ErrorMessage from '../../components/errors/ErrorMessage';
import useAxios from '../../hooks/useAxios';
import { links } from '../../utils/links';
import ContactPUpdate from './ContactPUpdate';

const ContactPInfo = () => {
  const api = useAxios();

  const [isEditing, setIsEditing] = useState(false);

  const [editingStudent, setEditingStudent] = useState(null);

  const { data, isLoading, isError, refetch, isFetching } = useQuery(
    ['id'],
    () => getContactPersons(api)
  );

  useEffect(() => {
    refetch();
  }, []);

  const { mutate } = useMutation(
    () => deleteContactPerson(api, editingStudent.id),
    {
      onSuccess: () => {
        toast.success('You have deleted successfully.', {
          autoClose: 8000,
        });
      },
    }
  );
  const componentRef = useRef();

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });
  const onEditStudent = (record) => {
    setIsEditing(true);
    setEditingStudent({ ...record });
  };
  const resetEditing = () => {
    setIsEditing(false);
  };
  const onDelete = (record) => {
    setEditingStudent({ ...record });
    mutate(isEditing);
  };

  const columns = [
    {
      dataIndex: 'contact_person_name',
      title: 'Full Name',
      sorter: (record1, record2) => {
        return record1.contact_person_name > record2.contact_person_name;
      },
    },
    {
      dataIndex: 'contact_person_email',
      title: 'Last Name',
      sorter: (record1, record2) => {
        return record1.contact_person_email > record2.contact_person_email;
      },
    },
    {
      dataIndex: 'contact_person_phone_number',
      title: 'Last Name',
      sorter: (record1, record2) => {
        return (
          record1.contact_person_phone_number >
          record2.contact_person_phone_number
        );
      },
    },
    {
      dataIndex: 'staff_number',
      title: 'Staff Number',
      sorter: (record1, record2) => {
        return record1.contact_person_address > record2.contact_person_address;
      },
    },
    {
      title: 'Actions',
      render: (record) => {
        return (
          <>
            <EditOutlined
              onClick={() => {
                onEditStudent(record);
              }}
            />
            <DeleteOutlined
              onClick={() => {
                onDelete(record);
              }}
              style={{ color: 'red', marginLeft: 12 }}
            />
          </>
        );
      },
    },
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
      <div className="listTitle">
        <em> List of Contact Persons</em>
      </div>
      <Space style={{ float: 'right' }}>
        <CSVLink
          filename="Contact_Person_Table.csv"
          data={data}
          className="btn btn-primary"
          onClick={() => {
            message.success('The file is downloading');
          }}
        >
          Export to CSV
        </CSVLink>

        <Button onClick={handlePrint} type="primary" danger>
          <FilePdfOutlined /> Export to PDF
        </Button>
      </Space>
      <div ref={componentRef}>
        {data && (
          <Table
            className="listTitle"
            bootstrap4
            columns={columns}
            dataSource={data}
            pagination={{ pageSize: 20 }}
          />
        )}

        <Modal show={isEditing} onHide={resetEditing}>
          <Modal.Header closeButton>
            <Modal.Title>Edit Employee</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <ContactPUpdate theEmployee={editingStudent} />
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={resetEditing}>
              Close Button
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
      <Button type="primary" size="lg" variant="brown" href={links.newStaff}>
        Add Staff
      </Button>
    </div>
  );
};

export default ContactPInfo;
