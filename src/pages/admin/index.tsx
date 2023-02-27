import * as React from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import type { ProColumns } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import { RecordKey } from '@ant-design/pro-utils/es/useEditableArray';
import { Button } from 'antd';
import { useModel } from 'umi';
import { getAllStudent } from '@/services/teacher';

import CreateTeacher from '@/components/CreatMember';

const Teacher: React.FC = () => {
  const { initialState, setInitialState } = useModel('@@initialState');
  const [isModalOpen, setIsModalOpen] = React.useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const columns: ProColumns<Record<string, any>>[] = [
    {
      title: '姓名',
      key: 'teacher_name',
      dataIndex: 'teacher_name',
      editable: false,
    },
    {
      title: '学号',
      key: 'id',
      dataIndex: 'id',
      editable: false,
    },
    {
      title: '操作',
      valueType: 'option',
      width: 200,
      render: (text, record, _, action) => [
        <a
          key="editable"
          onClick={() => {
            action?.startEditable?.(record.id);
          }}
        >
          编辑
        </a>,
      ],
    },
  ];
  return (
    <>
      <PageContainer>
        <ProTable<Record<string, any>, API.PageParams>
          rowKey="id"
          search={false}
          editable={{
            onSave: (key: RecordKey, row: Record<string, any>) => {
              console.log(key, row, 'onSave');
              return Promise.resolve();
            },
            onDelete: (key: RecordKey, row: Record<string, any>) => {
              console.log(key, row, 'onDelete');
              return Promise.resolve();
            },
          }}
          columns={columns}
          request={(params: Record<string, any>) => {
            const { current, pageSize, student_name, id } = params;
            return getAllStudent(
              initialState?.userID,
              pageSize,
              current,
              student_name,
              id,
            );
          }}
          pagination={{
            pageSize: 10,
          }}
          toolBarRender={() => [
            <Button type="primary" key="create" onClick={showModal}>
              添加用户
            </Button>,
          ]}
        />
        <CreateTeacher
          open={isModalOpen}
          onCancel={() => setIsModalOpen(false)}
        />
      </PageContainer>
    </>
  );
};

export default Teacher;
