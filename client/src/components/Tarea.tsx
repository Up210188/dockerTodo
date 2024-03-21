import React from 'react';

interface Task {
    id: number;
    nombre: string;
    descripcion: string;
    fecha: string;
    estatus: string;
    prioridad: string;
}

interface Props {
    tasks: Task[];
}

const Tarea: React.FC<Props> = ({ tasks }) => {
    if (tasks.length === 0) {
        return (
            <div className="text-center">
                <h1 className="mb-4">No hay tareas</h1>
            </div>
        )
    }

    return (
        <table className="table table-striped">
            <thead>
                <tr>
                    <th>Nombre</th>
                    <th>Descripción</th>
                    <th>Fecha Limite</th>
                    <th>Estatus</th>
                    <th>Prioridad</th>
                    <th>Actualizar</th>
                    <th>Eliminar</th>
                </tr>
            </thead>
            <tbody>
                {tasks.map((task) => (
                    <tr key={task.id}>
                        <td>{task.nombre}</td>
                        <td>{task.descripcion}</td>
                        <td>{task.fecha}</td>
                        <td>{task.estatus}</td>
                        <td>{task.prioridad}</td>
                        <td>
                            <button className="btn btn-primary">Actualizar</button>
                        </td>
                        <td>
                            <button className="btn btn-danger">Eliminar</button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default Tarea;

