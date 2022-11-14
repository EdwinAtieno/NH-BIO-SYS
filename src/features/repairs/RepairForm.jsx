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
import UpdateRepair from './UpdateRepair';
import FullPageLoader from '../../components/spinners/FullPageLoader';
import ErrorMessage from '../../components/errors/ErrorMessage';
import useAxios from '../../hooks/useAxios';
import { links } from '../../utils/links';
import { detailRepair } from '../../services/repairs';

const RepairForm = () => {
  const api = useAxios();
  const [isEditing, setIsEditing] = useState(false);

  const [editingStudent, setEditingStudent] = useState(null);

  const { data, isLoading, isError, refetch, isFetching } = useQuery(
    ['id'],
    () => detailRepair(api)
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
      dataIndex: 'equipment',
      title: 'Equipment',
      sorter: (record1, record2) => {
        return record1.equipment > record2.equipment;
      },
    },
    {
      dataIndex: 'supplier',
      title: 'Supplier',
      sorter: (record1, record2) => {
        return record1.supplier > record2.supplier;
      },
    },
    {
      dataIndex: 'repair_date',
      title: 'Date of Repair',
      sorter: (record1, record2) => {
        return record1.repair_date > record2.repair_date;
      },
    },
    {
      dataIndex: 'repair_cost',
      title: 'Repair Cost',
      sorter: (record1, record2) => {
        return record1.repair_cost > record2.repair_cost;
      },
    },
    {
      dataIndex: 'repair_description',
      title: 'Remarks',
      sorter: (record1, record2) => {
        return record1.repair_description > record2.repair_description;
      },
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
        <em> Repaired Equipments</em>
      </div>
      <Space style={{ float: 'right' }}>
        <CSVLink
          filename="Repair_Info_Table.csv"
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
            <UpdateRepair theEmployee={editingStudent} />
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

export default RepairForm;
