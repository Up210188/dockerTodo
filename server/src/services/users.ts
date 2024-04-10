import conn from '../db';

export const getUserService = async (userId: string | number) => {
    //Crear la sentencia 
    const SQL = `select
    TU.id
    TU.name,
    TU.username,
    TU.email,
    TU.birthday,
    from TR_USER TU
    where TU.id=?;`

    const [res] = await conn.query(SQL, [userId]);
    return res;
}

export const getUsersService = async (user_id: number | string) => {
    const query = `SELECT 
    TU.id
    TU.name,
    TU.username,
    TU.email,
    TU.birthday,
    FROM TR_USER TU;`

    const [users] = await conn.query(query)

    return users;
};

export const updateUserService = async (userId: number | string, user: UpdateUser) => {
    const query: string = "SELECT COUNT(*) AS count FROM TR_USER WHERE id = ?";

    try {
        const [rows]: any = await conn.query(query, [userId]);
        const count: number = rows[0]?.count || 0;

        if (count === 0) {
            return false
        };

    } catch (error) {
        return error;
    }

    // Generar la consulta SQL 1para actualizar la tarea
    const updateSQL = "UPDATE TR_USER SET name, username, password, birthday WHERE id=?";

    try {
        await conn.execute(updateSQL, [user.name, user.username, user.password, user.birthday, userId]);

        return true;

    } catch (error) {
        return error
    }
}

export const deleteUserService = async (userId: number | string) => {
    try {
        const checkExistenceSQL = "SELECT COUNT(*) AS count FROM TR_USER WHERE id=?";

        const [rows]: any = await conn.execute(checkExistenceSQL, [userId]);

        const count = rows[0].count;

        if (count === 0) {
            return "La tarea o usuario no existe.";
        }

        const deletSQL = "DELETE FROM TR_USER WHERE id=?;";

        await conn.execute(deletSQL, [userId]);

        return "Usuario eliminada."
    } catch (error) {
        return error;
    }
}

export interface CreateUser {
    name: string;
    username: string;
    password: string;
    email: string;
    birthday: Date;
}

export interface UpdateUser {
    name: string;
    username: string;
    password: string;
    birthday: Date;
}