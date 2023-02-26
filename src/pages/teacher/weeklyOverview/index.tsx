import * as React from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import { DrawerForm, ProCard } from '@ant-design/pro-components';
import type { ProColumns } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import RcResizeObserver from 'rc-resize-observer';
import { message, Rate } from 'antd';
import { useModel } from 'umi';

import { Editor, Toolbar } from '@wangeditor/editor-for-react';
import { IDomEditor, IEditorConfig, IToolbarConfig } from '@wangeditor/editor';

import '@wangeditor/editor/dist/css/style.css';

import { getWeeklys, comment } from '@/services/teacher';

const WeeklyOverview: React.FC = () => {
  const [open, setOpen] = React.useState<boolean>(false);
  const [responsive, setResponsive] = React.useState<boolean>(false);
  const [weekly, setWeekly] = React.useState<Record<string, any>>({});
  const { initialState, setInitialState } = useModel('@@initialState');
  const [rate, setRate] = React.useState<number>(0);

  const openDetail = React.useCallback((rows: Record<string, any>) => {
    setWeekly(rows);
    setOpen(true);
  }, []);

  const closeDetail = React.useCallback(() => {
    setOpen(false);
  }, []);

  const columns: ProColumns<Record<string, any>>[] = [
    {
      title: '姓名',
      dataIndex: 'StudentName',
      render: (text, record, index, action) => (
        <a
          onClick={() => {
            openDetail(record);
          }}
        >
          {text}
        </a>
      ),
    },
    {
      title: 'ID',
      dataIndex: 'StudentID',
      tooltip: 'id具有唯一性',
      hideInSearch: true,
    },
    {
      title: '提交日期',
      dataIndex: 'CreateAt',
      valueType: 'date',
      hideInSearch: true,
    },
    {
      title: '提交日期',
      dataIndex: 'CreateAt',
      hideInTable: true,
      valueType: 'dateTimeRange',
      search: {
        transform: (value) => {
          return {
            startTime: value[0],
            endTime: value[1],
          };
        },
      },
    },
    {
      title: '状态',
      dataIndex: 'Status',
      valueType: 'select',
      valueEnum: {
        1: {
          text: '已提交',
          status: 'Default',
        },
        2: {
          text: '已评论',
          status: 'Success',
        },
      },
    },
    {
      title: '评分',
      dataIndex: 'Score',
      hideInSearch: true,
      render: (text, record, index, action) => {
        return <Rate value={record.Score} disabled />;
      },
    },
  ];

  // editor 实例
  const [editor, setEditor] = React.useState<IDomEditor | null>(null);

  // 编辑器内容
  const [html, setHtml] = React.useState('');

  // 工具栏配置
  const toolbarConfig: Partial<IToolbarConfig> = {};

  // 编辑器配置
  const editorConfig: Partial<IEditorConfig> = {
    placeholder: '请输入内容...',
  };

  // 及时销毁 editor ，重要！
  React.useEffect(() => {
    return () => {
      if (editor == null) return;
      editor.destroy();
      setEditor(null);
    };
  }, [editor]);

  return (
    <>
      <PageContainer>
        <ProTable<Record<string, any>, API.PageParams>
          columns={columns}
          form={{
            // 由于配置了 transform，提交的参与与定义的不同这里需要转化一下
            syncToUrl: (values, type) => {
              if (type === 'get') {
                return {
                  ...values,
                  created_at: [values.startTime, values.endTime],
                };
              }
              return values;
            },
          }}
          request={(params: Record<string, any>) => {
            const {
              pageSize,
              current,
              Status,
              studenName,
              startTime,
              endTime,
            } = params;
            return getWeeklys(
              initialState?.userID,
              pageSize,
              current,
              Status,
              studenName,
              startTime,
              endTime,
            );
          }}
          rowKey="ID"
          pagination={{
            pageSize: 10,
          }}
        />
        <DrawerForm
          onOpenChange={setOpen}
          title="周报详情"
          width={window.screen.availWidth * 0.7}
          open={open}
          onFinish={async () => {
            comment(weekly.ID, html, rate)
              .then(() => {
                message.success('提交成功');
              })
              .catch(() => {
                message.error('提交失败');
              });

            return true;
          }}
        >
          {open && (
            <RcResizeObserver
              key="resize-observer"
              onResize={(offset) => {
                setResponsive(offset.width < 596);
              }}
            >
              <ProCard
                title="周报"
                extra="2019年9月28日"
                split={responsive ? 'horizontal' : 'vertical'}
                bordered
                headerBordered
              >
                <ProCard title="周报" colSpan="40%">
                  <div
                    style={{ height: 360 }}
                    dangerouslySetInnerHTML={{
                      __html: weekly.Content || '',
                    }}
                  ></div>
                </ProCard>
                <ProCard title="评论">
                  {weekly.Review ? (
                    <div
                      style={{ height: 360 }}
                      dangerouslySetInnerHTML={{
                        __html: weekly.Review,
                      }}
                    ></div>
                  ) : (
                    <>
                      评分：
                      <Rate
                        defaultValue={0}
                        onChange={(value) => {
                          setRate(value);
                        }}
                      />
                      <Toolbar
                        editor={editor}
                        defaultConfig={toolbarConfig}
                        mode="default"
                        style={{ borderBottom: '1px solid #ccc' }}
                      />
                      <Editor
                        defaultConfig={editorConfig}
                        value={html}
                        onCreated={setEditor}
                        onChange={(editor) => setHtml(editor.getHtml())}
                        mode="default"
                        style={{ height: '500px', overflowY: 'hidden' }}
                      />
                    </>
                  )}
                </ProCard>
              </ProCard>
            </RcResizeObserver>
          )}
        </DrawerForm>
      </PageContainer>
    </>
  );
};

export default WeeklyOverview;
