export default [
  { path: '/', redirect: '/login', exact: true },
  {
    path: '/login',
    component: '@/pages/login/index',
    layout: false,
    exact: true,
  },
  // 学生页面
  {
    path: '/student/frontPage',
    component: '@/pages/student/frontPage/index',
    exact: true,
    name: '首页',
    icon: 'crown',
    access: 'studentRouteFilter',
  },
  {
    path: '/student/weekly',
    component: '@/pages/student/weekly/index',
    exact: true,
    access: 'studentRouteFilter',
    name: '周报',
    icon: 'calendar',
  },
  {
    path: '/student/updatePWD',
    component: '@/pages/student/updatePWD/index',
    exact: true,
    access: 'studentRouteFilter',
    name: '修改密码',
    icon: 'edit',
  },

  // 教师页面
  {
    path: '/teacher/homePage',
    component: '@/pages/teacher/homePage/index',
    exact: true,
    access: 'teacherRouteFilter',
    name: '首页',
    icon: 'crown',
  },
  {
    path: '/teacher/weeklyOverview',
    component: '@/pages/teacher/weeklyOverview/index',
    exact: true,
    access: 'teacherRouteFilter',
    name: '周报概览',
    icon: 'database',
  },
  {
    path: '/teacher/member',
    component: '@/pages/teacher/member/index',
    exact: true,
    access: 'teacherRouteFilter',
    name: '成员管理',
    icon: 'contacts',
  },
  {
    path: '/teacher/updatePWD',
    component: '@/pages/teacher/updatePWD/index',
    exact: true,
    access: 'teacherRouteFilter',
    name: '修改密码',
    icon: 'edit',
  },
];
