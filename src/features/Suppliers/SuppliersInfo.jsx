/* eslint-disable react/jsx-props-no-spreading */
import { useQuery } from '@tanstack/react-query';
import React, { useEffect, useRef, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import { message, Space, Table } from 'antd';
import { Modal, Button } from 'react-bootstrap';
import 'antd/dist/antd.min.css';
import { FilePdfOutlined, EditOutlined } from '@ant-design/icons';
import { useReactToPrint } from 'react-to-print';
import { CSVLink } from 'react-csv';
import SupplierUpdate from './SupplierUpdate';
import { getSeppliers } from '../../services/suppliers';
import FullPageLoader from '../../components/spinners/FullPageLoader';
import ErrorMessage from '../../components/errors/ErrorMessage';
import useAxios from '../../hooks/useAxios';
import { links } from '../../utils/links';

const SuppliersInfo = () => {
  const api = useAxios();

  const [isEditing, setIsEditing] = useState(false);

  const [editingStudent, setEditingStudent] = useState(null);

  const { data, isLoading, isError, refetch, isFetching } = useQuery(
    ['id'],
    () => getSeppliers(api)
  );

  useEffect(() => {
    refetch();
  }, []);

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

  const columns = [
    {
      dataIndex: 'supplier_name',
      title: 'Supplier Name',
      sorter: (record1, record2) => {
        return record1.supplier_name > record2.supplier_name;
      },
    },
    {
      dataIndex: 'supplier_address',
      title: 'Supplier Address',
      sorter: (record1, record2) => {
        return record1.supplier_address > record2.supplier_address;
      },
    },
    {
      dataIndex: 'supplier_contact',
      title: 'Contact',
      sorter: (record1, record2) => {
        return record1.supplier_contact > record2.supplier_contact;
      },
    },
    {
      dataIndex: 'contact_person',
      title: 'Contact Person',
      sorter: (record1, record2) => {
        return record1.contact_person > record2.contact_person;
      },
    },
    {
      dataIndex: 'supplier_email',
      title: 'Email',
      sorter: (record1, record2) => {
        return record1.supplier_email > record2.supplier_email;
      },
    },
    {
      dataIndex: 'supplier_website',
      title: 'Website',
      sorter: (record1, record2) => {
        return record1.supplier_website > record2.supplier_website;
      },
    },
    {
      dataIndex: 'supplier_remarks',
      title: 'More Info',
      sorter: true,
    },
    {
      title: 'Actions',
      render: (record) => {
        return (
          <EditOutlined
            onClick={() => {
              onEditStudent(record);
            }}
          />
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
        <em> Supplier info</em>
      </div>
      <Space style={{ float: 'right' }}>
        <CSVLink
          filename="Supplier_Table.csv"
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
            <SupplierUpdate theEmployee={editingStudent} />
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
export default SuppliersInfo;
