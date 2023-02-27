export default function (initialState: any) {
  const { role } = initialState;
  return {
    teacherRouteFilter: role === 'teacher', // 只有管理员可访问
    studentRouteFilter: role === 'student',
    adminRouteFilter: role === 'root',
  };
}
