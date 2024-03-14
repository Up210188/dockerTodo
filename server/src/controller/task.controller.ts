// Dependencias
// eslint-disable-next-line no-unused-vars
import {Request, Response} from 'express';
import { getTasksService, createTaskService, getTaskService, updateTaskService } from '../services/tasks';

export async function getAllTasks(req: Request, res: Response) {
	// Obtenemos el ID a partir de la autentificación del usuario
    const user_id: number | string = 1
    const task_id: number = 1
    
    // Realizamos la consulta a las tareas
	const tasks = await getTasksService(user_id)
    
    // Verifica si el usuario tiene tareas
    // if (!tasks){
    //     return res.json('Not tasks')
    // }
    return res.json(tasks)
}

export async function getOneTaks(req: Request, res: Response) {
    //Extraer id de usuario.
    const id: string | undefined = req.params.id
    
    // Obtenemos la tarea
    const [task] = await getTaskService(id);

    //Valido si existe la tarea
    if (!task)
        return res.status(404).json({ message: "Task not found" });

    res.json({task});
    return;
}

export async function createTask(req: Request, res: Response) {
    const body = req.body
    // Verificar si los datos requeridos están presentes
    if (!body.fk_statusid || !body.fk_priorityid || !body.name || !body.description || !body.deadline) {
        return res.status(400).json({ message: "Todos los campos son requeridos." });
    }

    try {
        const result = await createTaskService(body)

        if (result) {
            // Devolver el resultado de la consulta
            res.json({ message: "Tarea creada exitosamente."});
        }
        return true;
    } catch (error) {
        // Manejar cualquier error que ocurra durante la ejecución de la consulta
        console.error("Error al crear la tarea:", error);
        res.status(500).json({ message: "Error al crear la tarea. Por favor, inténtalo de nuevo más tarde." });
        return false;
    }
}

export async function updateTask(req: Request, res: Response) {
        // Recuperar los datos de la solicitud HTTP
        const { fk_statusid, fk_priorityid, name, descripcion, deadline } = req.body;

        const user_id = req.user.id;
        const task_id = 1;
        
        // Generar la consulta SQL para verificar si la tarea existe
        const checkExistenceSQL = "SELECT COUNT(*) AS count FROM tr_task WHERE id = ?";
    
        try {
            // Ejecutar la consulta SQL para verificar si la tarea existe
            const rows = await updateTaskService(user_id, task_id)
    
            // Obtener el número de filas retornadas por la consulta
            //const count = rows[0].count;
    
            // Verificar si la tarea existe en la base de datos
            //if (count === 0) {
            //    // Si no existe la tarea, devolver un mensaje de error
            //    return res.status(404).json({ message: "La tarea con el ID proporcionado no existe." });
            //}
    
            // Generar la consulta SQL para actualizar la tarea
            //const updateSQL = "UPDATE tr_task SET fk_statusid=?, fk_priorityid=?, name=?, descripcion=?, deadline=? WHERE id=?";
    
            //// Ejecutar la consulta SQL para actualizar la tarea
            //await conn.execute(updateSQL, [fk_statusid, fk_priorityid, name, descripcion, deadline, id]);
    
            // Respuesta al cliente indicando que la tarea ha sido actualizada exitosamente
            // res.status(200).json({ message: "La tarea se actualizó exitosamente." });
        } catch (error) {
            // Manejar errores
            console.error("Error al actualizar la tarea:", error);
            res.status(500).json({ error: "Error al actualizar la tarea." });
        }
        return;
}

export function deleteTask(req: Request, res: Response) {

}

