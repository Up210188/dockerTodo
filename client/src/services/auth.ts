const BASE_URL = new URL('http://localhost:3000/api/');

export type UserRegister = {
  name?: string;
  username?: string;
  email?: string;
  password?: string;
  birthday?: string
};

export type UserLogin = {
  username?: string;
  password?: string;
};

export type HttpRespose = {
  token: string;
}

/**
 *  Registra un usuario en la base de datos
 *
 * @param user Parametro de los datos del usuario a registrar
 * @returns Respuesta http para el registro de usuario
 */
export function register(user: UserRegister) {
  const REGISTER_URL = new URL('register', BASE_URL);

  return fetch(REGISTER_URL, {
    method: 'POST',
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(user)
  }).then((resp) => {
    if (!resp.ok)
      throw new Error("Algo salio Mal!!!!! :(");


    return resp.json();
  });
}

export const login = async (user: UserLogin): Promise<HttpRespose> => {
  const LOGIN_URL = new URL('login', BASE_URL);

  const resp = await fetch(LOGIN_URL, {
    method: 'POST',
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(user)
  });

  if (!resp.ok) {
    if (resp.status === 404)
      throw new Error("El usuario no se encontro!");
    else if (resp.status === 403)
      throw new Error("La contraseña es incorrecta!");
    else
      throw new Error("Algo salio mal!!!!!");
  }

  return resp.json();
};

