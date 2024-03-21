import React, { useState } from "react";
import {createTask} from "../services/tasks.ts"

const ModalInsert: React.FC<ModalInsertProps> = ({ showModal, onClose }) => {
  const [formData, setFormData] = useState<TaskInsert>({
    name: "",
    description: "",
    deadline: "",
    fk_statusid: "",
    fk_priorityid: ""
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>): void => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };
  
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    console.log(formData)
    try {
      createTask(formData)
    } catch (error) {

    }
    
    onClose(); // Cierra el modal después de agregar la tarea
  };
  
  return (
    <>
      {/* Fondo oscurecido */}
      <div className={`modal-backdrop fade ${showModal ? 'show' : ''}`} style={{ zIndex: showModal ? 1040 : -1 }}></div>

      {/* Modal */}
      <div className={`modal ${showModal ? 'show' : ''}`} style={{ display: showModal ? 'block' : 'none', zIndex: showModal ? 1050 : -1 }}>
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header d-flex justify-content-between">
              <h5 className="modal-title">Agregar tarea</h5>
              <button type="button" className="close" onClick={onClose}>
                <span>&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="nombre">Nombre:</label>
                  <input onChange={handleChange} type="text" className="form-control" id="nombre" name="name" required placeholder="Ingresa el nombre de la tarea" />
                </div>
                <div className="form-group">
                  <label htmlFor="descripcion">Descripción:</label>
                  <input onChange={handleChange} type="text" className="form-control" id="descripcion" name="description" required placeholder="Ingresa una descripción de la tarea" />
                </div>
                <div className="form-group">
                  <label htmlFor="fecha">Fecha de vencimiento:</label>
                  <input onChange={handleChange} type="datetime-local" className="form-control" id="fecha" name="deadline" required placeholder="Ingresa la fecha de vencimiento de la tarea" />
                </div>
                <div className="form-group">
                  <label htmlFor="estatus">Estatus:</label>
                  <select onChange={handleChange} className="form-select" id="estatus" name="fk_statusid">
                    <option disabled selected value="">Selecciona un estatus</option>
                    <option value="1">Completada</option>
                    <option value="2">En proceso</option>
                    <option value="3">Pendiente</option>
                    <option value="4">Cancelada</option>
                  </select>
                </div>
                <div className="form-group">
                  <label htmlFor="prioridad">Prioridad:</label>
                  <select onChange={handleChange} className="form-select" id="prioridad" name="fk_priorityid">
                    <option disabled selected value="">Selecciona una prioridad</option>
                    <option value="2">Altamente prioritaria</option>
                    <option value="3">Prioritaria</option>
                    <option value="4">Medianamente prioritaria</option>
                    <option value="5">No prioritaria</option>
                  </select>
                </div>
                <div className="d-flex justify-content-end">
                  <button type="button" className="btn btn-primary me-2" onClick={onClose}>Cerrar</button>
                  <button type="submit" className="btn btn-secondary">Agregar</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

interface ModalInsertProps {
  showModal: boolean;
  onClose: () => void;
}
/*
  "name": "Trapear",
  "description": "Ejemplo trapear",
  "deadline": "2024-01-15 10:00:00",
  "fk_statusid": 1,
  "fk_priorityid": 2
*/
export interface TaskInsert {
  name: string;
  description: string;
  deadline: string;
  fk_statusid: string;
  fk_priorityid: string;
}
export default ModalInsert;
