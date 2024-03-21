import React, { useState, useEffect } from "react";
import ModalInsert from "../components/ModalInsert";
import Tarea from "../components/Tarea";
import { tasks as data } from "../task";

interface Task {
  id: number;
  nombre: string;
  descripcion: string;
  fecha: string;
  estatus: string;
  prioridad: string;
}

const Home: React.FC = () => {
  const [mostrarFormulario, setMostrarFormulario] = useState<boolean>(false);
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    setTasks(data);
  }, []);

  const toggleFormulario = (): void => {
    setMostrarFormulario(!mostrarFormulario);
  };

  function createTask(task: Task): void {
    setTasks([...tasks, task]);
  }

  return (
    <>
      {/* Fondo oscurecido */}
      <div className={`modal-backdrop fade ${mostrarFormulario ? 'show' : ''}`} style={{ zIndex: mostrarFormulario ? 1030 : -1 }}></div>

      <div className="container mt-5">
        <div className="d-flex justify-content-between align-items-center">
          <h1 className="text-center">Lista de tareas</h1>
          <div>
            <ModalInsert createTask={createTask} showModal={mostrarFormulario} onClose={toggleFormulario} />
            <button className="btn btn-primary ms-3" onClick={toggleFormulario}>Agregar una nueva tarea</button>
          </div>
        </div>
      </div>

      <div className="container">
        <Tarea tasks={tasks} />
      </div>
    </>
  );
}

export default Home;

