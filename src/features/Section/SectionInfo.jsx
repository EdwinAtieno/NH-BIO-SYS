/* eslint-disable react/jsx-props-no-spreading */
import { useQuery } from '@tanstack/react-query';
import React, { useEffect, useRef, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import { message, Space, Table, Tag } from 'antd';
import { Modal, Button } from 'react-bootstrap';
import 'antd/dist/antd.min.css';
import { FilePdfOutlined, EditOutlined } from '@ant-design/icons';
import { useReactToPrint } from 'react-to-print';
import { CSVLink } from 'react-csv';
import { getSections } from '../../services/sections';
import FullPageLoader from '../../components/spinners/FullPageLoader';
import ErrorMessage from '../../components/errors/ErrorMessage';
import useAxios from '../../hooks/useAxios';
import { links } from '../../utils/links';
import SectionUpdate from './SectionUpdate';

const SectionInfo = () => {
  const api = useAxios();

  const [isEditing, setIsEditing] = useState(false);

  const [editingStudent, setEditingStudent] = useState(null);

  const { data, isLoading, isError, refetch, isFetching } = useQuery(
    ['id'],
    () => getSections(api)
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
      dataIndex: 'section_name',
      title: 'Section Name',
      sorter: (record1, record2) => {
        return record1.section_name > record2.section_name;
      },
    },
    {
      dataIndex: 'specialization',
      title: 'Specialization',
      sorter: (record1, record2) => {
        return record1.specialization > record2.specialization;
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
        <em> Sections in the department</em>
      </div>
      <Space style={{ float: 'right' }}>
        <CSVLink
          filename="Section_Table.csv"
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
            <SectionUpdate theEmployee={editingStudent} />
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

export default SectionInfo;
