import { request } from 'umi';

// 创建周报
export async function getAllStudent(
  teacher_id: number,
  page_size?: number,
  current?: number,
  student_name?: string,
  id?: number,
) {
  return request('/api/teacher/member', {
    method: 'get',
    params: {
      teacher_id,
      page_size: page_size || 10,
      current: current || 1,
      student_name,
      id,
    },
  });
}
