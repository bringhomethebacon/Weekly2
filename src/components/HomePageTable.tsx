import * as React from 'react';
import ProTable from '@ant-design/pro-table';
import type { ProColumns } from '@ant-design/pro-table';
import { Rate } from 'antd';
import { useModel } from 'umi';

import { getWeeklys, unCommit } from '@/services/teacher';

interface HomePageTableProps {
  value: number;
  start_time: string;
  end_time: string;
}

const HomePageTable: React.FC<HomePageTableProps> = ({
  value,
  start_time,
  end_time,
}) => {
  const { initialState, setInitialState } = useModel('@@initialState');

  const columns: ProColumns<Record<string, any>>[] = [
    {
      title: '姓名',
      dataIndex: 'StudentName',
    },
    {
      title: 'ID',
      dataIndex: 'StudentID',
      tooltip: 'id具有唯一性',
      hideInSearch: true,
    },
    {
      title: '评分',
      dataIndex: 'Score',
      hideInSearch: true,
      render: (text, record, index, action) => {
        return <Rate disabled value={record.Score} />;
      },
    },
  ];

  if (value === 0) {
    return (
      <ProTable
        columns={columns}
        rowKey="StudentID"
        search={false}
        pagination={{
          pageSize: 10,
        }}
        request={(params: Record<string, any>) => {
          const { pageSize, current, status, student_name } = params;
          return getWeeklys(
            initialState?.userID,
            pageSize,
            current,
            status,
            student_name,
            start_time,
            end_time,
          );
        }}
      />
    );
  }
  if (value === -1) {
    return (
      <ProTable
        columns={columns}
        rowKey="StudentID"
        search={false}
        pagination={{
          pageSize: 10,
        }}
        request={(params: Record<string, any>) => {
          const { pageSize, current } = params;
          return unCommit(
            initialState?.userID,
            pageSize,
            current,
            start_time,
            end_time,
          );
        }}
      />
    );
  }

  return (
    <ProTable
      columns={columns}
      rowKey="StudentID"
      search={false}
      pagination={{
        pageSize: 10,
      }}
      request={(params: Record<string, any>) => {
        const { pageSize, current, status, student_name } = params;
        return getWeeklys(
          initialState?.userID,
          pageSize,
          current,
          value,
          student_name,
          start_time,
          end_time,
        );
      }}
    />
  );
};

export default HomePageTable;
