import { request } from 'umi';

// 获取所有学生
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

// 创建学生
export async function creaetStudent(
  teacher_id: number,
  id: number,
  student_name: string,
) {
  return request('/api/teacher/create/student', {
    method: 'post',
    params: { teacher_id },
    data: {
      id,
      student_name,
    },
  });
}

// 修改密码
export async function updatePWD(
  teacher_id: number,
  id: number,
  password: string,
  role: string,
) {
  return request('/api/teacher/reset', {
    method: 'put',
    params: { id, teacher_id, password, role },
  });
}

// 获取所有周报
export async function getWeeklys(
  teacher_id: number,
  page_size?: number,
  current?: number,
  status?: number,
  student_name?: string,
  start_time?: string,
  end_time?: string,
) {
  return request('/api/teacher/weeklys', {
    method: 'get',
    params: {
      teacher_id,
      page_size: page_size || 10,
      current: current || 1,
      status,
      student_name,
      start_time,
      end_time,
    },
  });
}

// 评论
export async function comment(id: number, comment: string, score: number) {
  return request('/api/teacher/weekly/comment', {
    method: 'put',
    params: { id, comment, score },
  });
}

// 返回未提交周报的人
export async function unCommit(
  teacher_id: number,
  page_size: number,
  current: number,
  start_time?: string,
  end_time?: string,
) {
  return request('/api/teacher/uncommit', {
    method: 'get',
    params: {
      teacher_id,
      page_size: page_size || 10,
      current: current || 1,
      start_time,
      end_time,
    },
  });
}

// 获取人数
export async function getNumbers(
  teacher_id: number,
  start_time: string,
  end_time: string,
) {
  return request('/api/teacher/index', {
    method: 'get',
    params: {
      teacher_id,
      start_time,
      end_time,
    },
  });
}
