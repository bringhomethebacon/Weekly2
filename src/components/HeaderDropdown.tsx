import * as React from 'react';
import { Button, Dropdown, Space, message } from 'antd';
import type { MenuProps } from 'antd';
import { useModel, history } from 'umi';
import { UserOutlined } from '@ant-design/icons';

const HeaderDropdown: React.FC = () => {
  const { initialState, setInitialState } = useModel('@@initialState');

  const handleMenuClick: MenuProps['onClick'] = ({ key }) => {
    // 退出
    if (key === 'quit') {
      // 清除initailState
      setInitialState({ isLogin: false });
      // 清除本地存储
      localStorage.clear();
      // 路由跳转
      history.push('/login');
    }
  };

  const items: MenuProps['items'] = [
    {
      key: 'quit',
      label: '退出',
    },
  ];

  return (
    <Space wrap>
      <Dropdown
        menu={{ items, onClick: handleMenuClick }}
        placement="bottomLeft"
      >
        <Button type="text">
          <UserOutlined />
          {initialState?.username}
        </Button>
      </Dropdown>
    </Space>
  );
};

export default HeaderDropdown;
