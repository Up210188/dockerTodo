import { useState } from 'react';
import ModalInsert from "../components/ModalInsert";
import Tarea from "../components/Tarea";


function Home() {
  const [mostrarFormulario, setMostrarFormulario] = useState<boolean>(false);

  const toggleFormulario = (): void => {
    setMostrarFormulario(!mostrarFormulario);
  };

  return (
    <>
      {/* Fondo oscurecido */}
      <div className={`modal-backdrop fade ${mostrarFormulario ? 'show' : ''}`} style={{ zIndex: mostrarFormulario ? 1030 : -1 }}></div>

      <div className="container mt-5">
  <div className="d-flex justify-content-between align-items-center">
    <h1 className="text-center">Tareas</h1>
    <div>
      <ModalInsert showModal={mostrarFormulario} onClose={toggleFormulario} />
      <button className="btn btn-primary ms-3" onClick={toggleFormulario}>Agregar una nueva tarea</button>
    </div>
  </div>
</div>

      <div className="container">
        <table className="table table-striped">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Descripción</th>
              <th>Fecha de vencimiento</th>
              <th>Estatus</th>
              <th>Prioridad</th>
              <th>Actualizar</th>
              <th>Eliminar</th>
            </tr>
          </thead>
          <tbody>
            <Tarea />
            <Tarea />
            <Tarea />
          </tbody>
        </table>
      </div>
    </>
  );
}


export default Home;
