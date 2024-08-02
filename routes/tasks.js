const express = require('express');
const router = express.Router();
const db = require('../db');

// Obtener todas las tareas
router.get('/tasks', (req, res) => {
    let sql = 'SELECT * FROM tasks';
    db.query(sql, (err, results) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.json(results);
        }
    });
});

// Agregar una nueva tarea
router.post('/tasks', (req, res) => {
    let newTask = { task: req.body.task };
    let sql = 'INSERT INTO tasks SET ?';
    db.query(sql, newTask, (err, result) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.status(201).json({ id: result.insertId, ...newTask });
        }
    });
});

// Eliminar una tarea
router.delete('/tasks/:id', (req, res) => {
    let sql = `DELETE FROM tasks WHERE id = ${req.params.id}`;
    db.query(sql, (err, result) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.status(204).send();
        }
    });
});

module.exports = router;
