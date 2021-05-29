var express = require('express')
var cors = require('cors')
var app = express()
app.use(cors());
app.use(express.json())
var db = require('./dbConnection');

var port = process.env.PORT || 8080

app.get('/', function (req, res) {
    res.json({ mensaje: '¡Hola Mundo!' })
})

app.get('/usuarios', async function (req, res) {
    db.query('SELECT * FROM usuarios', (error, result) => {
        if (error) res.status(500).send("fallo al listar");
        res.send(result);
    });
})

app.get('/usuario/:id', async function (req, res) {
    const id = req.params.id;
    db.query('SELECT * FROM usuarios WHERE id = ?', [id], (error, result) => {
        if (error) res.status(500).send("fallo al listar");
        res.send(result);
    });
})

app.post('/usuarios/create', function (req, res) {
    db.query('INSERT INTO usuarios SET ?', req.body, (error, result) => {
        if (error) throw error;
 
        res.status(201).send(`User added with ID: ${result.insertId}`);
    });
})

app.put('/usuarios/:id', (req, res) => {
    const id = req.params.id;
 
    db.query('UPDATE usuarios SET ? WHERE id = ?', [req.body, id], (error, result) => {
        if (error) throw error;
 
        res.send('Usuario actualizado exitosamente');
    });
});

app.del('/', function (req, res) {
    res.json({ mensaje: 'Método delete' })
})

app.listen(port)
console.log('API Servidor Iniciado ' + port)