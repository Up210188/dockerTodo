import React, { useEffect, useState } from 'react';
import Usuario from '../components/Usuario';
import { getOneUser } from '../services/users';
import ModalUserUpdate, { formatDateISOString, UserUpdate } from '../components/ModalUserUpdate';

const PerfilUsuario: React.FC = () => {
  const [user, setUser] = useState<User>();
  const [mostrarFormulario, setMostrarFormulario] = useState<boolean>(false);

  const toggleFormulario = () => {
    setUser(undefined)
    setMostrarFormulario(!mostrarFormulario);
  };

  useEffect(() => {
    showUserData();
  }, [])

  const showUserData = async () => {
    try {
      const getUser = await getOneUser();
      setUser(getUser);
    } catch (error) {
      console.error('Error al obtener el usuario: ', error)
    }
  };

  const handleChange = (e:React.ChangeEvent<HTMLInputElement | HTMLSelectElement>): void => {
    const { name, value } = e.target;
    setUser(prevData=> ({
      ...prevData,
      [name]: value
    }))
  }

  if (!user)
    return;

  const bornDay = new Date(user.birthday!)

  const updateUserForm = async (user: UserUpdate) => {
    if (!user)
      return
    user.birthday = formatDateISOString(new Date(user.birthday!))
    try {
      await updateUserForm(user)
    } catch (error) {
      console.error(error)
    }
  }

  const onClose = () => { 
    setMostrarFormulario(false)
  }

  return (
    <div className="perfil-usuario">
      <h1>Perfil de Usuario</h1>
      <Usuario
        nombre={user.name}
        nombreUsuario={user.username}
        email={user.email}
        fechaNacimiento={bornDay.toDateString()}
        fotoUrl={user.utlPhoto}
      />
      <ModalUserUpdate showModal={mostrarFormulario} onClose={onClose} updateUserForm={updateUserForm}></ModalUserUpdate>
      <button className="btn btn-primary" onClick={() => toggleFormulario()}>Actualizar</button>
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
export default PerfilUsuario;
