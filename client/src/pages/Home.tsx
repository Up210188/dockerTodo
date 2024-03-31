import React, { useState, useEffect } from "react";
import ModalInsert from "../components/ModalInsert";
import Tarea from "../components/Tarea";
//import { tasks as data } from "../task";
import { getAllTasks } from "../services/tasks";


const Home: React.FC = () => {
  const [mostrarAlertaInsert, setMostrarAlertaInsert] = useState<string>("d-none");
  const [mostrarFormulario, setMostrarFormulario] = useState<boolean>(false);
  const [tasks, setTasks] = useState<Task[]>([]);
  let seCreo: boolean = false;
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const tasks = await getAllTasks(); // Llama a la función getAllTasks para obtener los datos
        setTasks(tasks)
        //setTasks(tasksData); // Establece los datos obtenidos del servidor en el estado local
      } catch (error) {
        console.error('Error al obtener las tareas:', error);
      }
    };
    fetchData();
    //setTasks(data);
  }, [mostrarFormulario]);
  
  const toggleFormulario = (): void => {
    setMostrarFormulario(!mostrarFormulario);
    if (seCreo) {
      setMostrarAlertaInsert("");
    }
  };

  const handleTaskCreated = (): void => {
    setMostrarAlertaInsert(""); // Muestra la alerta después de crear la tarea
  };

  return (
    <>
      {/* Fondo oscurecido */}
      <div className={`modal-backdrop fade ${mostrarFormulario ? 'show' : ''}`} style={{ zIndex: mostrarFormulario ? 1030 : -1 }}></div>

      <div className="container mt-5">
        <div className="d-flex justify-content-between align-items-center">
          <h1 className="text-center">Lista de tareas</h1>
          <div>
            <ModalInsert showModal={mostrarFormulario} onClose={toggleFormulario} onTaskCreated={handleTaskCreated}/>
            <button className="btn btn-primary ms-3" onClick={toggleFormulario}>Agregar una nueva tarea</button>
          </div>
        </div>
      </div>
      <div className="container">
        <div className={`alert alert-dismissible alert-success ${mostrarAlertaInsert}`}>
          <button type="button" className="btn-close" data-bs-dismiss="alert"></button>
          <strong>Correcto!!</strong> Tarea agregada con éxito.<a href="#" className="alert-link"></a>
        </div>
        <Tarea tasks={tasks}/>
      </div>
    </>
  );
}

interface Task {
  id: number;
  nombre: string;
  descripcion: string;
  fecha: string;
  estatus: string;
  prioridad: string;
}
export default Home;

