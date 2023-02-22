import { ReactNode, useCallback, useMemo, useState } from 'react';
import { Tabs } from 'antd';
import { CloseOutlined } from '@ant-design/icons';

import './index.less';

interface Pane {
  label: ReactNode;
  key: string;
  children: ReactNode;
}

export interface DetailTabsProps {
  open: boolean;
  panes: Pane[];
  multiple?: boolean;
  onClose?: () => void;
}

export function DetailTabs({
  panes,
  open,
  onClose,
  multiple,
}: DetailTabsProps) {
  const [activeTab, setActiveTab] = useState(panes?.[0]?.key);

  const handleTabChange = useCallback((tabKey: string) => {
    if (tabKey === 'close') {
      onClose?.();
    } else {
      setActiveTab(tabKey);
    }
  }, []);

  const newPanes = useMemo(() => {
    const clonePanes = [...panes];
    clonePanes.forEach((pane) => {
      pane.children = multiple ? (
        <div className="multiple">重复勾选多条数据</div>
      ) : (
        pane.children
      );
    });

    return clonePanes;
  }, [panes]);

  return (
    <Tabs
      type="card"
      className="detail"
      activeKey={activeTab}
      style={open ? { transform: 'translate(0, 0)' } : {}}
      onChange={handleTabChange}
      items={[
        {
          key: 'close',
          label: <CloseOutlined />,
        },
        ...newPanes,
      ]}
    />
  );
}
