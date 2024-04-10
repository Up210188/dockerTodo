import React, { useEffect, useState } from 'react';
import Usuario from '../components/Usuario';
import { getOneUser } from '../services/users';

const PerfilUsuario: React.FC<ModalGetUserProps> = ({ idUser }) => {
  const [user, setUser] = useState<User>();

  console.log(user);

  useEffect(()=>{
    showUserData()
  }, [])

  console.log(user);

  const showUserData = async () => {
    try {
      const getUser = await getOneUser(idUser);
      setUser(getUser)
    } catch (error) {
      console.error('Error al obtener el usuario: ', error)
    }
  };

  if (!user)
    return;

  return (
    <div className="perfil-usuario">
      <h1>Perfil de Usuario</h1>
      <Usuario
        nombre={user.name}
        nombreUsuario={user.username}
        email={user.email}
        fechaNacimiento={user.birthday}
        fotoUrl={user.utlPhoto}
      />
    </div>
  );
};

interface User {
  name?: string,
  username?: string,
  email?: string,
  birthday?: string,
  utlPhoto?: string
}

interface ModalGetUserProps {
  idUser: number
}

export default PerfilUsuario;
