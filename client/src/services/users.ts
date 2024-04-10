import { getToken } from './localStorage';

const BASE_URL = new URL('http://localhost:3000/api/');

export const getOneUser = async (idUser: number) => {
    const USER_URL = new URL(`user/${idUser}`, BASE_URL);
  
    const resp = await fetch(USER_URL, {
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
    const data = await resp.json();
    return data;
  };