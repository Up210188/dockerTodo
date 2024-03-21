import { TaskInsert } from '../components/ModalInsert';
import { getToken } from './localStorage';

const BASE_URL = new URL('http://localhost:3000/api/');

export const getAllTasks = async (): Promise<Task[]> => {
  const TASK_URL = new URL('task', BASE_URL);

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
  const data: Task[] = await resp.json(); // Tipar directamente la respuesta como un arreglo de tareas
  return data;
};

export const createTask = async (taskInsert: TaskInsert): Promise<Boolean> =>{
  const TASK_URL = new URL('task', BASE_URL);
  const resp = await fetch(TASK_URL, {
    method: 'POST',
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${getToken()}`
    },
    body: JSON.stringify(taskInsert)
  });
  if (!resp.ok) {
    resp.status
    //if (resp.status === 401 || resp.status === 403)
    if ([401, 403].includes(resp.status))
      throw new Error("Error de Autentificación")
  }
  const seCreo = await resp.json();
  return seCreo;
};

export type Task = {
  id: number;
  nombre: string;
  descripcion: string;
  fecha: string;
  estatus: string;
  prioridad: string;
}
