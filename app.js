const mysql = require('mysql2');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(cors());
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://127.0.0.1:5500');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    next();
});

const dbConfig = {
    host: 'localhost',
    user: 'demsoyath',
    password: 'teste123',
    database: 'mineradoradb'
};

const connection = mysql.createConnection(dbConfig);

connection.connect((err) => {
    if (err) {
        console.error('Erro ao conectar ao MySQL:', err);
        throw err;
    }
    console.log('Conectado ao MySQL com sucesso!');
});

app.post('/cadastrar_minerador', (req, res) => {
    const { nome, telefone, cpf, horas_trabalhadas } = req.body;
    console.log(req.body); // Log the request body for debugging
    const query = 'INSERT INTO mineradores (Nome_Minerador, Telefone, CPF, Horas_Trabalhadas) VALUES (?, ?, ?, ?)';
    connection.query(query, [nome, telefone, cpf, horas_trabalhadas], (err, result) => {
        if (err) {
            console.error('Erro ao cadastrar minerador:', err);
            res.status(500).send('Erro ao cadastrar minerador');
        } else {
            res.status(200).send('Minerador cadastrado com sucesso');
        }
    });
});

app.post('/cadastrar_minerio', (req, res) => {
    const { nome_minerio, descricao } = req.body;
    console.log(req.body); // Log the request body for debugging
    const query = 'INSERT INTO minerios (Nome_Minerios, Descrição) VALUES (?, ?)';
    connection.query(query, [nome_minerio, descricao], (err, result) => {
        if (err) {
            console.error('Erro ao cadastrar minério:', err);
            res.status(500).send('Erro ao cadastrar minério');
        } else {
            res.status(200).send('Minério cadastrado com sucesso');
        }
    });
});

app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
});
