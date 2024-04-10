import React, { useEffect, useState } from "react";
import { getOneUser } from "../services/users";

const ModalUserUpdate: React.FC<ModalUserUpdateProps> = ({ showModal, onClose, updateUserForm }) => {
  const [user, setUser] = useState<UserUpdate>();

  useEffect(() => {
    (async ()=> {
        try {
            const getUser = await getOneUser();
            setUser(getUser)

            if (!user)
                return;
            const birthday = new Date(user?.birthday!)
            const formatedDate = formatDateISOString(new Date(birthday))
            setUser({
                birthday: formatedDate
            })
        } catch (error) {
            console.error(error)
        }
    })
  }, [showModal])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>): void => {
    const { name, value } = e.target;
    setUser(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  
  if (!user) return;

  return (
    <>
      {/* Fondo oscurecido */}
      <div
        className={`modal-backdrop fade ${showModal ? "show" : ""}`}
        style={{ zIndex: showModal ? 1040 : -1 }}
      ></div>

      {/* Modal */}
      <div
        className={`modal ${showModal ? "show" : ""}`}
        style={{ display: showModal ? "block" : "none", zIndex: showModal ? 1050 : -1 }}
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header d-flex justify-content-between">
              <h5 className="modal-title">Actualizar tarea</h5>
              <button type="button" className="close" onClick={onClose}>
                <span>&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <form>
                <div className="form-group">
                  <label htmlFor="nombre">Nombre:</label>
                  <input onChange={handleChange} defaultValue={user?.name} type="text" className="form-control" id="nombre" name="name" required placeholder="Ingresa el nombre de la tarea" />
                </div>
                <div className="form-group">
                  <label htmlFor="descripcion">Usuario:</label>
                  <input onChange={handleChange} defaultValue={user?.username} type="text" className="form-control" id="description" name="description" required placeholder="Ingresa una descripción de la tarea" />
                </div>
                <div className="form-group">
                  <label htmlFor="descripcion">Contraseña:</label>
                  <input onChange={handleChange} defaultValue={user?.password} type="text" className="form-control" id="description" name="description" required placeholder="Ingresa una descripción de la tarea" />
                </div>
                <div className="form-group">
                  <label htmlFor="fecha">:</label>
                  <input onChange={handleChange} defaultValue={user?.birthday?.toString()} type="datetime-local" className="form-control" id="fecha" name="deadline" required placeholder="Ingresa la fecha de vencimiento de la tarea" />
                </div>
                
                <div className="d-flex justify-content-end">
                  <button type="button" className="btn btn-primary me-2" onClick={onClose}>Cerrar</button>
                  <button type="button" className="btn btn-secondary" onClick={()=>{updateUserForm(user); onClose();}}>Actualizar</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export const formatDateISOString = (date: Date): string => {
  // Extraer los componentes de la fecha y hora
  var año = date.getFullYear();
  var mes = ('0' + (date.getMonth() + 1)).slice(-2); // Los meses comienzan desde 0, por eso se suma 1
  var día = ('0' + date.getDate()).slice(-2);
  var hora = ('0' + date.getHours()).slice(-2);
  var minuto = ('0' + date.getMinutes()).slice(-2);

  // Construir la cadena de fecha y hora manualmente
  var cadenaFechaHora = año + '-' + mes + '-' + día + 'T' + hora + ':' + minuto;

 return(cadenaFechaHora); // Salida: "2024-04-03T17:40"
};
export default ModalUserUpdate;

interface ModalUserUpdateProps {
  showModal: boolean;
  onClose: () => void;
  updateUserForm: (user:UserUpdate) => void;
}

export interface UserUpdate {
  name?: string;
  username?: string;
  password?: string;
  birthday?: Date | string;
}