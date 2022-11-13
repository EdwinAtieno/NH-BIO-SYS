/* eslint-disable react/jsx-props-no-spreading */
import { useQuery } from '@tanstack/react-query';
import React, { useEffect, useRef, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import { message, Space, Table, Tag } from 'antd';
import { Modal, Button } from 'react-bootstrap';
import 'antd/dist/antd.min.css';
import { FilePdfOutlined } from '@ant-design/icons';
import { useReactToPrint } from 'react-to-print';
import { CSVLink } from 'react-csv';
import EditForm from './EditForm';
import { getAllUser } from '../../services/users';
import FullPageLoader from '../../components/spinners/FullPageLoader';
import ErrorMessage from '../../components/errors/ErrorMessage';
import useAxios from '../../hooks/useAxios';

const UsersForm = () => {
  const api = useAxios();

  const [isEditing, setIsEditing] = useState(false);

  const [editingStudent, setEditingStudent] = useState(null);

  const { data, isLoading, isError, refetch, isFetching } = useQuery(
    ['id'],
    () => getAllUser(api)
  );

  useEffect(() => {
    refetch();
  }, []);

  const componentRef = useRef();

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  const resetEditing = () => {
    setIsEditing(false);
  };

  const columns = [
    {
      dataIndex: 'id',
      title: 'Id',
    },
    {
      dataIndex: 'first_name',
      title: 'First Name',
      sorter: (record1, record2) => {
        return record1.first_name > record2.first_name;
      },
    },
    {
      dataIndex: 'last_name',
      title: 'Last Name',
      sorter: (record1, record2) => {
        return record1.last_name > record2.last_name;
      },
    },
    {
      dataIndex: 'middle_name',
      title: 'Last Name',
      sorter: (record1, record2) => {
        return record1.middle_name > record2.middle_name;
      },
    },
    {
      dataIndex: 'staff_number',
      title: 'Staff Number',
      sorter: (record1, record2) => {
        return record1.staff_number > record2.staff_number;
      },
    },
    {
      dataIndex: 'roles',
      title: 'Roles',
      filters: [
        { text: 'biomed', value: 'biomed' },
        { text: 'h.o.d', value: 'h.o.d' },
        { text: 'admin', value: 'admin' },
        { text: 'supplier_admin', value: 'supplier_admin' },
      ],
      onFilter: (value, record) => record.roles.indexOf(value) === 0,
      render: (_, { roles }) => (
        <>
          {roles.map((role) => {
            let color = role.length > 5 ? 'geekblue' : 'green';
            if (role === 'loser') {
              color = 'volcano';
            }
            return (
              <Tag color={color} key={role}>
                {role.toUpperCase()}
              </Tag>
            );
          })}
        </>
      ),
    },
    {
      dataIndex: 'phone_number',
      title: 'Phone Number',
      sorter: (record1, record2) => {
        return record1.phone_number > record2.phone_number;
      },
    },
    {
      dataIndex: 'email',
      title: 'Email',
      sorter: true,
    },
    {
      title: 'Actions',
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
        <b> Staffs Present and Their Roles</b>
      </div>
      <Space style={{ float: 'right' }}>
        <CSVLink
          filename="Staff_Table.csv"
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
            <EditForm theEmployee={editingStudent} />
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={resetEditing}>
              Close Button
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </div>
  );
};

export default UsersForm;
