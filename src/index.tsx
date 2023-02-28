import * as React from 'react';

import { useHistory } from 'umi';
import { useModel, history } from 'umi';

import Login from './pages/login';
import FrontPage from './pages/student/frontPage';
import HomePage from './pages/teacher/homePage';
import Teacher from './pages/admin';

const Index = () => {
  const { initialState, setInitialState } = useModel('@@initialState');
  const history = useHistory();

  // 触发路由切换
  if (initialState?.role === 'student') {
    return <FrontPage />;
  } else if (initialState?.role === 'teacher') {
    return <HomePage />;
  } else if (initialState?.role === 'root') {
    return <Teacher />;
  } else {
    return <Login />;
  }
};

export default Index;
