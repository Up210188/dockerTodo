import { number } from 'zod';
import conn from '../db';

export const getTaskService = (id: string | undefined) => {
    //Crear la sentencia 
    const SQL = `select
    TRT.id,
    TRT.name as Título,
    TRT.description as Descripción,
    TCP.description as Prioridad,
    TCS.description as Estado,
    TRT.deadline
    from tr_task TRT join tc_priority TCP
    join tc_status TCS
    where TRT.id = ? and TRT.fk_priorityid = TCP.id and TCS.id = TRT.fk_statusid;`

    return conn.query(SQL, [id]);
}

export  const getTasksService = async (user_id: number | string) => {
	const query = `SELECT tt.name FROM TR_TASK tt
    INNER JOIN TR_USER_TASK tut
    INNER JOIN TR_USER tu
    WHERE tt.id = tut.idTask 
    AND tut.idUser = tu.id
    AND tu.id=?;`
    
    const tasks = await conn.query(query, user_id)

    return tasks[0];
};

export const createTaskService = ( body: Task) => {
    // Crear la sentencia SQL con los parámetros adecuados
    const SQL = "INSERT INTO tr_task(fk_statusid, fk_priorityid, name, description, deadline) VALUES (?, ?, ?, ?, NOW())";

    // Ejecutar la consulta SQL con los datos proporcionados
    const result = conn.query(SQL, [body.fk_statusid, body.fk_priorityid, body.name, body.description, body.deadline]);

    return result
}

export const updateTaskService = async (userId: number | string, taskId: number) => {
    const query: string = "SELECT COUNT(*) AS count FROM TR_USER_TASK WHERE idUser = ? AND idTask = ?";
    
    try {
        const [rows] = await conn.query(query, [userId, taskId]);
        const count: number = rows[0].count;

        // Si count es mayor que 0, significa que hay registros
        return count;
    } catch (error) {
        console.error("Error al ejecutar la consulta:", error);
        return 0; // En caso de error, se asume que no existe el registro
    }
}

export interface Task {
	name: string;
	description: string;
	deadline: Date;
	fk_statusid:number;
	fk_priorityid: number;
}
