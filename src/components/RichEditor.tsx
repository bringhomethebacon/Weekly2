import * as React from 'react';

import E from 'wangeditor';

interface RichEditorProps {
  value?: any;
  onChange?: (e: HTMLElement) => void;
}

const RichEditor: React.FC<RichEditorProps> = ({ onChange }) => {
  let editorRef = React.useRef(null);
  React.useEffect(() => {
    let editor = new E(editorRef.current); // 初始化富文本编辑器实例
    // 配置菜单栏，删减菜单，调整顺序
    // editor.config.menus = ['bold', 'head', 'link', 'italic', 'underline'];

    // 配置菜单栏，设置不需要的菜单
    editor.config.excludeMenus = ['video'];
    editor.config.height = 500;
    editor.config.onblur = function (newHtml: HTMLElement) {
      // console.log('onblur', newHtml); // 获取最新的 html 内容
      onChange?.(newHtml);
    };
    editor.create(); // 向指定DOM中渲染编辑器
  }, []);
  return <div ref={editorRef}></div>;
};

export default RichEditor;
