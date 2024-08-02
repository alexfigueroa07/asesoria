// index.js
const express = require('express');
const taskRouter = require('./routes/tasks');



const app = express();
const port = 3000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// router de cada ruta
app.use('/api', taskRouter);



app.use(express.static('public'));

app.listen(port, () => {
    console.log(`Servidor web escuchando en http://localhost:${port}`);
});
