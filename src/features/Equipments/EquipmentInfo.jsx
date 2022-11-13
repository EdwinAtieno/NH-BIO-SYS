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
import UpdateEquipment from './UpdateEquipment';
import { getEquipments } from '../../services/equipments';
import FullPageLoader from '../../components/spinners/FullPageLoader';
import ErrorMessage from '../../components/errors/ErrorMessage';
import useAxios from '../../hooks/useAxios';
import { links } from '../../utils/links';

const EquipmentInfo = () => {
  const api = useAxios();

  const [isEditing, setIsEditing] = useState(false);

  const [editingStudent, setEditingStudent] = useState(null);

  const { data, isLoading, isError, refetch, isFetching } = useQuery(
    ['id'],
    () => getEquipments(api)
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
      dataIndex: 'asset_number',
      title: 'Asset Number',
    },
    {
      dataIndex: 'equipment_name',
      title: 'Equipment Name',
      sorter: (record1, record2) => {
        return record1.equipment_name > record2.equipment_name;
      },
    },
    {
      dataIndex: 'equipment_type',
      title: 'Equipment Type',
      sorter: (record1, record2) => {
        return record1.equipment_type > record2.equipment_type;
      },
    },
    {
      dataIndex: 'equipment_model',
      title: 'Equipment Model',
      filters: [
        { text: 'lease', value: 'lease' },
        { text: 'outright purchase', value: 'outright purchase' },
        { text: 'placement', value: 'placement' },
      ],
      onFilter: (value, record) => record.roles.indexOf(value) === 0,
    },
    {
      dataIndex: 'status_remarks',
      title: 'Status Remarks',
    },
    {
      dataIndex: 'status',
      title: 'Status',
      filters: [
        { text: 'active', value: 'active' },
        { text: 'broken', value: 'broken' },
        { text: 'repaired', value: 'repaired' },
        { text: 'out of service', value: 'out of service' },
        { text: 'in maintenance', value: 'in maintenance' },
      ],
      onFilter: (value, record) => record.roles.indexOf(value) === 0,
    },
    {
      dataIndex: 'department',
      title: 'Department',
      sorter: (record1, record2) => {
        return record1.department > record2.department;
      },
    },
    {
      dataIndex: 'supplier',
      title: 'Supplier',
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
        <em> Staffs Present and Their Roles</em>
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
            <UpdateEquipment theEmployee={editingStudent} />
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

export default EquipmentInfo;
