import React from 'react';

interface UsuarioProps {
  nombre: string;
  nombreUsuario: string;
  email: string;
  fechaNacimiento: string;
  fotoUrl: string;
}

const Usuario: React.FC<UsuarioProps> = ({
  nombre,
  nombreUsuario,
  email,
  fechaNacimiento,
  fotoUrl,
}) => {
  return (
    <div className="usuario">
      <div className="foto">
        <img src={fotoUrl} alt="Foto de perfil" />
      </div>
      <div className="datos">
        <h2>{nombre}</h2>
        <p>Nombre de usuario: {nombreUsuario}</p>
        <p>Email: {email}</p>
        <p>Fecha de nacimiento: {fechaNacimiento}</p>
      </div>
    </div>
  );
};

export default Usuario;
