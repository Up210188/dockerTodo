import React, { useEffect, useState } from "react";
import { getOneTask, updateTask } from "../services/tasks";

const ModalUpdate: React.FC<ModalUpdateProps> = ({ showModal, onClose, idTask }) => {
  const [task, setTask] = useState<TaskUpdate>();

  useEffect(() => {
    if (idTask) {
      (async () => {
        try {
          const task = await getOneTask(idTask) as any;

          const date = new Date(task.deadline);
          const formatedDate = date.toISOString().slice(0,16);

          setTask({
            name: task.name,
            description: task.description,
            deadline: formatedDate,
            fk_priorityid: task.fk_priorityid,
            fk_statusid: task.fk_statusid
          })
        } catch (error) {
          console.error(error);
        }
      })()
    }

    return () => {
      setTask(undefined)
    }
  }, [showModal])
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>): void => {
    const { name, value } = e.target;
    setTask(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const date = new Date(task!.deadline)
    task!.deadline = date.toISOString().slice(0,16)
    try {
      await updateTask(idTask, task!); // Espera a que la tarea se cree antes de cerrar el modal
    } catch (error) {
      console.error("Error al crear la tarea:", error);
    }

    onClose(); // Cierra el modal después de agregar la tarea
  }

  if (!task) return;

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
                  <input onChange={handleChange} defaultValue={task?.name} type="text" className="form-control" id="nombre" name="name" required placeholder="Ingresa el nombre de la tarea" />
                </div>
                <div className="form-group">
                  <label htmlFor="descripcion">Descripción:</label>
                  <input onChange={handleChange} defaultValue={task?.description} type="text" className="form-control" id="description" name="description" required placeholder="Ingresa una descripción de la tarea" />
                </div>
                <div className="form-group">
                  <label htmlFor="fecha">Fecha de vencimiento:</label>
                  <input onChange={handleChange} defaultValue={task?.deadline} type="datetime-local" className="form-control" id="fecha" name="deadline" required placeholder="Ingresa la fecha de vencimiento de la tarea" />
                </div>
                <div className="form-group">
                  <label htmlFor="estatus">Estatus:</label>
                  <select onChange={handleChange} defaultValue={task ? task.fk_statusid: "0"} className="form-select" id="estatus" name="fk_statusid">
                    <option disabled value="0">Selecciona un estatus</option>
                    <option value="1">Completada</option>
                    <option value="2">En proceso</option>
                    <option value="3">Pendiente</option>
                    <option value="4">Cancelada</option>
                  </select>
                </div>
                <div className="form-group">
                  <label htmlFor="prioridad">Prioridad:</label>
                  <select onChange={handleChange} defaultValue={task ? task.fk_priorityid: "0"} className="form-select" id="prioridad" name="fk_priorityid">
                    <option disabled value="0">Selecciona una prioridad</option>
                    <option value="1">Altamente prioritaria</option>
                    <option value="2">Prioritaria</option>
                    <option value="3">Medianamente prioritaria</option>
                    <option value="4">No prioritaria</option>
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

export interface TaskUpdate {
  name?: string;
  description?: string;
  deadline?: any;
  fk_statusid?: number | string;
  fk_priorityid?: number | string;
}