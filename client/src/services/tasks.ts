import { getToken } from './localStorage';

const BASE_URL = new URL('http://localhost:3000/api/');

export const getAllTasks = async () => {
  const TASK_URL = new URL('tasks', BASE_URL);

  const resp = await fetch(TASK_URL, {
    method: 'GET',
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${getToken()}`
    }
  });

  if (!resp.ok) {
    resp.status
    //if (resp.status === 401 || resp.status === 403)
    if ([401, 403].includes(resp.status))
      throw new Error("Error de Autentificación")
  }

  return resp.json();
};