// Dependencias
import pkg from 'express';
import conn from '../db.js';

const { request, response } = pkg;

/**
 *
 * @param {request} req
 * @param {response} res
 */
export function getAllTasks(req, res) {
    res.send(req.user);
}

export function getOneTaks(req, res) {

}

export function createTask(req, res) {

}

export function updateTask(req, res) {

}

export function deleteTask(req, res) {

}