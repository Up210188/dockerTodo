import React, { useState } from "react";
import { updateTask} from "../services/tasks";


const ModalUpdate: React.FC<ModalUpdateProps> = ({ showModal, onClose }) => {
  const [formData, setFormData] = useState<TaskUpdate>({
    name: "",
    description: "",
    deadline: "",
    fk_statusid: "",
    fk_priorityid: ""
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ): void => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    try {
      const result=await updateTask(16, formData); 
      console.log(result);
      onClose(); // Cierra el modal después de actualizar la tarea
    } catch (error) {
      console.error("Error al actualizar la tarea:", error);
    }
  };

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
              <form onSubmit={handleSubmit}>
              <div className="form-group">
                  <label htmlFor="nombre">Nombre:</label>
                  <input onChange={handleChange} type="text" className="form-control" id="nombre" name="nombre" required placeholder="Ingresa el nombre de la tarea" />
                </div>
                <div className="form-group">
                  <label htmlFor="descripcion">Descripción:</label>
                  <input onChange={handleChange} type="text" className="form-control" id="descripcion" name="descripcion" required placeholder="Ingresa una descripción de la tarea" />
                </div>
                <div className="form-group">
                <label htmlFor="fecha">Fecha de vencimiento:</label>
                  <input onChange={handleChange} type="datetime-local" className="form-control" id="fecha" name="deadline" required placeholder="Ingresa la fecha de vencimiento de la tarea" />
                </div>
                <div className="form-group">
                  <label htmlFor="estatus">Estatus:</label>
                  <select onChange={handleChange} className="form-select" id="estatus" name="estatus">
                    <option disabled selected value="">Selecciona un estatus</option>
                    <option value="Completa">Completa</option>
                    <option value="Pendiente">Pendiente</option>
                    <option value="Incompleta">Incompleta</option>
                  </select>
                </div>
                <div className="form-group">
                  <label htmlFor="prioridad">Prioridad:</label>
                  <select onChange={handleChange} className="form-select" id="prioridad" name="prioridad">
                    <option disabled selected value="">Selecciona una prioridad</option>
                    <option value="Alta">Alta</option>
                    <option value="Media">Media</option>
                    <option value="Baja">Baja</option>
                  </select>
                </div>
                <div className="d-flex justify-content-end">
                  <button type="button" className="btn btn-primary me-2" onClick={onClose}>Cerrar</button>
                  <button type="submit" className="btn btn-secondary">Actualizar</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ModalUpdate;

interface ModalUpdateProps {
    showModal: boolean;
    onClose: () => void;
  }
  
  /* interface Task {
    id: number;
    nombre: string;
    descripcion: string;
    fecha: string;
    estatus: string;
    prioridad: string;
  } */
  export interface TaskUpdate {
    name: string;
    description: string;
    deadline: string;
    fk_statusid: string;
    fk_priorityid: string;
  }