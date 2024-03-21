import React from 'react';
import Usuario from '../components/Usuario';

const PerfilUsuario: React.FC = () => {
  const usuario = {
    nombre: 'Juan Pérez',
    nombreUsuario: 'juanperez123',
    email: 'juan@example.com',
    fechaNacimiento: '01/01/1990',
    fotoUrl: '',
  };

  return (
    <div className="perfil-usuario">
      <h1>Perfil de Usuario</h1>
      <Usuario
        nombre={usuario.nombre}
        nombreUsuario={usuario.nombreUsuario}
        email={usuario.email}
        fechaNacimiento={usuario.fechaNacimiento}
        fotoUrl={usuario.fotoUrl}
      />
    </div>
  );
};

export default PerfilUsuario;
