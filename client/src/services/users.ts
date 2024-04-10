import { UserUpdate } from '../components/ModalUserUpdate';
import { getToken } from './localStorage';

const BASE_URL = new URL('http://localhost:3000/api/');

export const getOneUser = async () => {
    const USER_URL = new URL(`user`, BASE_URL);
  
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

export const updateUser = async (Data: UserUpdate, newData: UserUpdate) => {
  const USER_URL = new URL('user', BASE_URL);

  const body = Object.assign(Data, newData)

  return await fetch(USER_URL, {
    method: 'PATCH',
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer: ${getToken()}`
    },
    body: JSON.stringify(body)
  }).then((res)=>{
    if (!res.ok) {
      throw new Error("No se pudo modificar el usuario.");
    }
    return res.json()
  });

}