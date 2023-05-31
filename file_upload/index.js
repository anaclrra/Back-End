const express = require('express');
const formidable = require('formidable');
const fs = require('fs');

const app = express();
const port = 3000;

app.get('/', (req, res) =>{ 
    res.send('Servidor funcionando...')
});

app.post('/arquivo', (req, res) =>{ 
    const form = new formidable.IncomingForm();
    form.parse(req, (error, fields, files) =>{
        const caminhoOriginal = files.arquivo.filepath;
        const caminhoNovo = __dirname + '\\arquivos\\';
        const nomeArquivo = caminhoNovo + files.arquivo.originalFilename;
        fs.renameSync(caminhoOriginal, nomeArquivo);
        res.send('Arquivo gravado com sucesso!')
    });
    
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
})