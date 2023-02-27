import { request } from 'umi';

export async function login(
  id: number | string,
  password: string,
  role: string,
) {
  return request<Record<'username' | 'token' | 'role' | 'userID', string>>(
    '/api/login',
    {
      method: 'post',
      params: { id, password, role },
    },
  );
}
