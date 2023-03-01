import { request } from 'umi';

// 获取老师所有信息
export async function getTeachers(page_size: number, current: number) {
  return request('/api/teacher', {
    method: 'get',
    params: { page_size: page_size || 10, current: current || 1 },
  });
}

// 创建老师
export async function createTeacher(id: number | string, teacher_name: string) {
  return request('/api/create/teacher', {
    method: 'post',
    data: { id, teacher_name },
  });
}

// 删除老师
export async function deleteTeacher(id: number | string) {
  return request('/api/delete/teacher', {
    method: 'delete',
    params: {
      id,
    },
  });
}
