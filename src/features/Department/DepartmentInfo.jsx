/* eslint-disable react/jsx-props-no-spreading */
import { useMutation, useQuery } from '@tanstack/react-query';
import React, { useEffect, useRef, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import { message, Space, Table, Tag } from 'antd';
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
import { deleteDepartment, getDepartments } from '../../services/departments';
import FullPageLoader from '../../components/spinners/FullPageLoader';
import ErrorMessage from '../../components/errors/ErrorMessage';
import useAxios from '../../hooks/useAxios';
import { links } from '../../utils/links';
import DepartmentUpdate from './DepartmentUpdate';

const DepartmentInfo = () => {
  const api = useAxios();

  const [isEditing, setIsEditing] = useState(false);

  const [editingStudent, setEditingStudent] = useState(null);

  const { data, isLoading, isError, refetch, isFetching } = useQuery(
    ['id'],
    () => getDepartments(api)
  );

  useEffect(() => {
    refetch();
  }, []);

  const { mutate } = useMutation(
    () => deleteDepartment(api, editingStudent.id),
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
      dataIndex: 'department_name',
      title: 'Department Name',
      sorter: (record1, record2) => {
        return record1.department_name > record2.department_name;
      },
    },
    {
      dataIndex: 'department_location',
      title: 'Department Location',
      sorter: (record1, record2) => {
        return record1.department_location > record2.department_location;
      },
    },
    {
      dataIndex: 'building',
      title: 'Building',
      sorter: (record1, record2) => {
        return record1.building > record2.building;
      },
    },
    {
      dataIndex: 'sections',
      title: 'Sections',
      sorter: (record1, record2) => {
        return record1.sections > record2.sections;
      },
      filters: [
        { text: 'biomed', value: 'biomed' },
        { text: 'h.o.d', value: 'h.o.d' },
        { text: 'admin', value: 'admin' },
        { text: 'supplier_admin', value: 'supplier_admin' },
      ],
      onFilter: (value, record) => record.sections.indexOf(value) === 0,
      render: (_, { sections }) => (
        <>
          {sections.map((section) => {
            let color = section.length > 5 ? 'geekblue' : 'green';
            if (section === 'loser') {
              color = 'volcano';
            }
            return (
              <Tag color={color} key={section}>
                {section.toUpperCase()}
              </Tag>
            );
          })}
        </>
      ),
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
        <em> Departments in the Hospital</em>
      </div>
      <Space style={{ float: 'right' }}>
        <CSVLink
          filename="Department_Table.csv"
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
            <DepartmentUpdate theEmployee={editingStudent} />
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

export default DepartmentInfo;
