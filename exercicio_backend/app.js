const express = require('express');
const mysql = require('mysql');
const app = express();

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'exercicio_backend'
});

connection.connect((error) => {
    if(error) {
        console.log('Erro ao conectar o bando de dados.', error.message);
    }
    else {
        console.log('Conectado ao banco de dados com sucesso!')
    }
});

app.get('/users', (req,res) => {
    connection.query('SELECT * FROM usuarios', (error, rows) => {
        if(error) {
            console.log('Erro ao processar o comando SQL.', )
        }
        else {
            res.json(rows);
        }        
    });
});

app.get('/users/:id', (req,res) => {
    const id = req.params['id'];
    connection.query('SELECT codUsuario, nomeUsuario, loginName FROM usuarios WHERE codUsuario = ?', [id], (error, rows) => {
        if(error) {
            console.log('Erro ao processar o comando SQL.', )
        }
        else {
            res.json(rows[0]);
        }        
    });
});

app.listen(3000, () => {
    console.log('Servidor de API funcionando na porta 3000')
});