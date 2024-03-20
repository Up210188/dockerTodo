import conn from '../db';

export const getTaskService = async (taskId: string | undefined, userId: string | number) => {
    //Crear la sentencia 
    // TRT.id,
    // TU.name as Usuario,
    const SQL = `select
    TRT.name as Título,
    TRT.description as Descripción,
    TCP.description as Prioridad,
    TCS.description as Estado,
    TRT.deadline
    from TR_USER_TASK TUT
    join TR_USER TU ON TUT.idUser = TU.id
    join TR_TASK TRT ON TUT.idTask = TRT.id 
    join TC_PRIORITY TCP ON TRT.fk_priorityid = TCP.id
    join TC_STATUS TCS ON TCS.id = TRT.fk_statusid
    where TUT.idTask = ? AND TUT.idUser = ?;`
    /*`select
    TRT.id,
    TRT.name as Título,
    TRT.description as Descripción,
    TCP.description as Prioridad,
    TCS.description as Estado,
    TRT.deadline
    from tr_task TRT 
    inner join tc_priority TCP on TRT.fk_priorityid = TCP.id
    inner join tc_status TCS on TRT.fk_statusid = TCS.id
    where TRT.id = ?;`*/
    /**/
    const [res] = await conn.query(SQL, [taskId,userId]);
    return res;
}

export  const getTasksService = async (user_id: number | string) => {
	const query = `SELECT 
	tt.name as Título,
    tt.description as Descripción,
    TCP.description as Prioridad,
    TCS.description as Estado,
	tt.deadline
		FROM TR_TASK tt
		INNER JOIN TR_USER_TASK tut
		INNER JOIN TR_USER tu
        join TC_PRIORITY TCP ON tt.fk_priorityid = TCP.id
		join TC_STATUS TCS ON TCS.id = tt.fk_statusid
		WHERE tt.id = tut.idTask 
		AND tut.idUser = tu.id
		AND tu.id=?;`

    /*
    `SELECT tt.name FROM TR_TASK tt
    INNER JOIN TR_USER_TASK tut
    INNER JOIN TR_USER tu
    WHERE tt.id = tut.idTask 
    AND tut.idUser = tu.id
    AND tu.id=?;`
     */
    
    const tasks = await conn.query(query, user_id)

    const bool = true
    const integer = 1
    const string = "Hola"

    if (typeof bool === 'boolean')
        console.log(typeof bool)
    else if (typeof bool === 'number')
        console.log(typeof integer)
    else if (typeof bool === 'string')
        console.log(typeof string)

    return tasks[0];
};

export const createTaskService = async (userId: string | number, body: Task) => {
    // Crear la sentencia SQL con los parámetros adecuados
    const insertTaskSQL = "INSERT INTO TR_TASK (fk_statusid, fk_priorityid, name, description, deadline) VALUES (?, ?, ?, ?, NOW())";
    // Ejecutar la consulta SQL con los datos proporcionados
    const [rowsTask]: any = await conn.query(insertTaskSQL, [body.fk_statusid, body.fk_priorityid, body.name, body.description, body.deadline]);

    // Verificar que la tarea fué creada
    if (rowsTask.affectedRows === 0) {
        return "No se pudo crear la tarea"
    }

    // Obtener el id de la tarea creada
    const taskId = rowsTask.insertId

    // Crear y ejecutar un Query para crear la relación en TR_USER_TASK
    const insertUserTaskSQL = "INSER INTO TR_USER_TASK (idTask, idUser) VALUES (?,?);"
    const [rowsUserTask]: any = await conn.query(insertUserTaskSQL, [userId, taskId])

    // Verificar que si se haya creado el registro
    if (rowsUserTask.affectedRows === 0) {
        return "Se creó la tarea, pero ocurrió un error."
    }

    return "Tarea creada correctamente."
}

export const updateTaskService = async (userId: number | string, taskId: string | undefined, task: Task) => {
    const query: string = "SELECT COUNT(*) AS count FROM TR_USER_TASK WHERE idUser = ? AND idTask = ?";
    
    try {
        const [rows]: any = await conn.query(query, [userId, taskId]);        
        const count: number = rows[0]?.count || 0;
    
        // Verificar si la tarea existe en la base de datos
        if (count === 0) {
            // Si no existe la tarea, devolver un mensaje de error
            return false
        };
    
    } catch (error) {
        return error;
    }
    
    // Generar la consulta SQL 1para actualizar la tarea
    const updateSQL = "UPDATE TR_TASK SET fk_statusid=?, fk_priorityid=?, name=?, description=?, deadline=? WHERE id=?";
    
    try {
        // Ejecutar la consulta SQL para actualizar la tarea
        await conn.execute(updateSQL, [task.fk_statusid, task.fk_priorityid, task.name, task.description, task.deadline, taskId]);

        // Respuesta al cliente indicando que la tarea ha sido actualizada exitosamente
        return true;
    
    } catch (error) {
        // En caso de error, se asume que no existe el registro
        return error
    }
}

export const deleteTaskService = async (userId: number | string, taskId: string | undefined) => {
    try{
        // Generar la consulta SQL para verificar si la tarea existe
        const checkExistenceSQL = "SELECT COUNT(*) AS count FROM TR_USER_TASK WHERE idTask = ? AND idUser = ?";

        // Ejecutar la consulta SQL para verificar si la tarea existe
        const [rows]: any = await conn.execute(checkExistenceSQL, [taskId, userId]);

        // Obtener el número de filas retornadas por la consulta
        const count = rows[0].count;

        //Verificar si la tarea existe en la base de datos
        if (count === 0) {
            // Si no existe la tarea, devolver un mensaje de error
            return "La tarea o usuario no existe.";
        }

        //Generar la consulta SQl para eliminar la tarea 
        const deletSQL = "DELETE FROM TR_USER_TASK WHERE idTask=? AND idUser=?;";

        // Ejecutar la consulta SQL para eliminar la tarea por su ID
        await conn.execute(deletSQL, [taskId, userId]);

        return "Tarea eliminada."
    } catch (error) {
        return error;
    }
}

export interface TaskUser {
    userid: number,
    taskid: number;
}

export interface Task {
	name: string;
	description: string;
	deadline: Date;
	fk_statusid:number;
	fk_priorityid: number;
}
