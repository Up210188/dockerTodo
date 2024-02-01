// Dependencias
import pkg from 'express';
import jwt from 'jsonwebtoken';
const { request, response } = pkg;

/**
 *
 * @param {request} req
 * @param {response} res
 * @param {Function} next
 */
export function authToken(req, res, next) {
    try {
        const authHeader = req.headers?.authorization

        const token = authHeader
            ? authHeader.split(' ')[1]
            : undefined;

        // Valido que existe el token de la petición
        if (!token)
            return res.status(401).json({ message: "Authentication Error" });

        // Se valida que el token sea correcto
        const user = jwt.verify(token, "this is my key!");

        // Guardo el usuario en la petición http
        req.user = user;

        // Es para salir del middleware!
        next();
    } catch (error) {
        if (error instanceof jwt.JsonWebTokenError)
            return res.status(403).json({ message: "Invalid Token!" });

        res.status(400).json(error);
    }
}