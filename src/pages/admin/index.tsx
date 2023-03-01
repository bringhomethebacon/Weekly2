import * as React from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import type { ProColumns } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import { Button, message } from 'antd';
import { useModel } from 'umi';

import CreateTeacher from '@/components/CreateTeacher';

import { getTeachers, deleteTeacher } from '@/services/admin';

const Teacher: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = React.useState(false);

  const ref = React.useRef<any>();

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
      title: '教师编号',
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
            deleteTeacher(record.id)
              .then(() => {
                message.success('删除成功');
              })
              .finally(() => {
                ref.current.reload();
              });
          }}
        >
          删除
        </a>,
      ],
    },
  ];
  return (
    <>
      <PageContainer>
        <ProTable<Record<string, any>, API.PageParams>
          actionRef={ref}
          rowKey="id"
          search={false}
          columns={columns}
          request={(params: Record<string, any>) => {
            const { current, pageSize } = params;
            return getTeachers(pageSize, current);
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
          onCancel={() => handleCancel()}
          onLoad={() => ref.current.reload()}
        />
      </PageContainer>
    </>
  );
};

export default Teacher;
