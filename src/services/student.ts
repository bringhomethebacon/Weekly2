import { request } from 'umi';

// 创建周报
export async function createWeekly(
  id: number,
  content: string,
  status: number,
) {
  return request('/api/student/create', {
    method: 'post',
    params: { user_id: id },
    data: {
      content,
      status,
    },
  });
}

// 获取自己所有的周报
export async function getWeekly(
  id: number,
  pageSize?: number,
  current?: number,
  startTime?: string,
  endTime?: string,
) {
  return request('/api/student/weekly', {
    method: 'get',
    params: {
      student_id: id,
      page_size: pageSize || 10,
      current: current || 1,
      start_time: startTime,
      end_time: endTime,
    },
  });
}

// 修改密码
export async function updatePWD(id: number, password: string) {
  return request('/api/student/update', {
    method: 'put',
    params: {
      id,
      password,
    },
  });
}
