import * as React from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import { DrawerForm, ProCard } from '@ant-design/pro-components';
import type { ProColumns } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import RcResizeObserver from 'rc-resize-observer';
import { message, Rate } from 'antd';

import { Editor, Toolbar } from '@wangeditor/editor-for-react';
import { IDomEditor, IEditorConfig, IToolbarConfig } from '@wangeditor/editor';

import '@wangeditor/editor/dist/css/style.css';

const WeeklyOverview: React.FC = () => {
  const [open, setOpen] = React.useState<boolean>(false);
  const [responsive, setResponsive] = React.useState<boolean>(false);
  const [weekly, setWeekly] = React.useState({} as API.Weekly);
  const columns: ProColumns<API.Weekly>[] = [
    {
      title: '姓名',
      dataIndex: 'name',
      render: (text, record, index, action) => (
        <a
          onClick={() => {
            setWeekly(record);
            setOpen(true);
          }}
        >
          {text}
        </a>
      ),
    },
    {
      title: 'ID',
      dataIndex: 'id',
      tooltip: 'id具有唯一性',
      hideInSearch: true,
    },
    {
      title: '提交日期',
      dataIndex: 'created_at',
      valueType: 'date',
      hideInSearch: true,
    },
    {
      title: '提交日期',
      dataIndex: 'created_at',
      hideInTable: true,
      valueType: 'dateRange',
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
      dataIndex: 'status',
      valueType: 'select',
      valueEnum: {
        0: {
          text: '未提交',
          status: 'Error',
        },
        1: {
          text: '已提交',
          status: 'Default',
        },
        2: {
          text: '未提交',
          status: 'Success',
        },
      },
    },
    {
      title: '评分',
      dataIndex: 'score',
      hideInSearch: true,
      render: (text, record, index, action) => {
        return (
          <Rate
            defaultValue={record.score}
            onChange={(value) => {
              console.log(111, value);
            }}
          />
        );
      },
    },
  ];

  // editor 实例
  const [editor, setEditor] = React.useState<IDomEditor | null>(null);

  // 编辑器内容
  const [html, setHtml] = React.useState('<p>hello</p>');

  // 模拟 ajax 请求，异步设置 html
  React.useEffect(() => {
    setTimeout(() => {
      setHtml('<p>hello world</p>');
    }, 1500);
  }, []);

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
        <ProTable<API.Weekly, API.PageParams>
          columns={columns}
          // request={getWeeklyList}
          rowKey="id"
        />
        <DrawerForm
          onOpenChange={setOpen}
          title="周报详情"
          width={window.screen.availWidth * 0.7}
          open={open}
          onFinish={async () => {
            message.success('提交成功');
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
                <ProCard title="周报" colSpan="50%">
                  <div style={{ height: 360 }}>左侧内容</div>
                </ProCard>
                <ProCard title="评论">
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
