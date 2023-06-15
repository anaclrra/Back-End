const express = require('express');
const mysql = require('mysql');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
app.use(cors());
app.use(bodyParser.json());

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

function gerarToken(payload) {
    const senhaToken = 'ana2@05';
    return jwt.sign(payload, senhaToken, {expiresIn: 20});
};

app.post('/login', (req,res) => {
    const loginname = req.body.loginname;
    const password = req.body.password;
    connection.query('SELECT nomeUsuario FROM usuarios WHERE loginName = ? AND password = ?', 
    [loginname, password], (error, rows) => {
        if(error) {
            console.log('Erro ao processar o comando SQL.', )
        }
        else {
            if(rows.length > 0) {
                const payload = {noUsuario: rows[0].nomeUsuario};
                const token = gerarToken(payload);
                res.json({ acessToken: token});
            }
            else {
                res.status(403).json({ messageErro: 'Login Inválido!' });
            }
            
        }        
    });
});

app.listen(3000, () => {
    console.log('Servidor de API funcionando na porta 3000')
});