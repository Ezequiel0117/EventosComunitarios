const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;

const FILE_PATH = path.join(__dirname, 'eventos.json');

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.status(200).json({
        mensaje: 'API de Eventos Comunitarios activa',
        registros: '/registros'
    });
});

const leerRegistros = () => {
    try {
        const data = fs.readFileSync(FILE_PATH, 'utf-8');
        return JSON.parse(data);
    } catch (error) {
        return [];
    }
};

app.get('/registros', (req, res) => {
    const eventos = leerRegistros();
    res.status(200).json(eventos);
});

app.post('/registros', (req, res) => {
    const { organizador, descripcion, fecha, categoria } = req.body;

    if (!organizador || !descripcion || !fecha || !categoria) {
        return res.status(400).json({
            error: 'Todos los campos (organizador, descripcion, fecha, categoria) son obligatorios.'
        });
    }

    const eventos = leerRegistros();

    const nuevoEvento = {
        id: Date.now().toString(),
        organizador,
        descripcion,
        fecha,
        categoria
    };

    eventos.push(nuevoEvento);

    try {
        fs.writeFileSync(FILE_PATH, JSON.stringify(eventos, null, 2), 'utf-8');
        res.status(201).json({
            mensaje: 'Evento registrado con éxito',
            evento: nuevoEvento
        });
    } catch (error) {
        res.status(500).json({ error: 'Error al guardar el registro en el servidor.' });
    }
});

app.listen(PORT, () => {
    console.log(`Servidor de Eventos Comunitarios corriendo en http://localhost:${PORT}`);
});
