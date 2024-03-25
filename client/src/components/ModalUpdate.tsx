import React, { useEffect, useState } from "react";
import { getOneTask, updateTask } from "../services/tasks";


const ModalUpdate: React.FC<ModalUpdateProps> = ({ showModal, onClose, idTask }) => {
  const [task, setTask] = useState<{name: string}>();
  const [formData, setFormData] = useState<TaskUpdate>({
    name: "",
    description: "",
    deadline: "",
    fk_statusid: "",
    fk_priorityid: ""
  });

  useEffect(() => {
    if (idTask) {
      (async () => {
        try {
          const task = await getOneTask(idTask) as any;
          
          setTask({
            name: task.task.Título
          })
        } catch (error) {
          console.log(error);
        }
      })()
    }
  }, [showModal])
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>): void => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await updateTask(idTask, formData); // Espera a que la tarea se cree antes de cerrar el modal
      console.log(formData);
    } catch (error) {
      console.error("Error al crear la tarea:", error);
    }

    onClose(); // Cierra el modal después de agregar la tarea
  }

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
                  <input onChange={handleChange} value={task?.name} type="text" className="form-control" id="nombre" name="name" required placeholder="Ingresa el nombre de la tarea" />
                </div>
                <div className="form-group">
                  <label htmlFor="descripcion">Descripción:</label>
                  <input onChange={handleChange} type="text" className="form-control" id="description" name="description" required placeholder="Ingresa una descripción de la tarea" />
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
  idTask: number;
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

/* const tarea={
  name:"comer hamburguesa",
  description:"mañana tengo que comer",
  deadline:"2024-02-12", 
  fk_statusid:"1", 
  fk_priorityid:"2"
} */