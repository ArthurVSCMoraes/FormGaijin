const express = require('express');
const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json());

// Rota para receber os dados do formulário
app.post('/salvarFormulario', (req, res) => {
  const formData = req.body;
  const filePath = path.join(__dirname, 'data', 'formResponses.json');

  const formDataJSON = JSON.stringify(formData, null, 2);

  const dataDir = path.join(__dirname, 'data');
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir);
  }

  if (fs.existsSync(filePath)) {
    fs.readFile(filePath, 'utf8', (err, data) => {
      if (err) {
        console.error('Erro ao ler o arquivo:', err);
        return res.status(500).send('Erro ao ler o arquivo de respostas.');
      }
      try {
        const existingData = JSON.parse(data);
        let allData = [];
        if (Array.isArray(existingData)) {
          allData = existingData;
        }
        allData.push(formData);
        const allDataJSON = JSON.stringify(allData, null, 2);
        fs.writeFile(filePath, allDataJSON, 'utf8', (err) => {
          if (err) {
            console.error('Erro ao escrever no arquivo:', err);
            return res.status(500).send('Erro ao escrever os dados no arquivo.');
          }
          res.send('Dados do formulário salvos com sucesso!');
        });
      } catch (error) {
        console.error('Erro ao fazer parse do arquivo:', error);
        return res.status(500).send('Erro ao processar o arquivo de respostas.');
      }
    });
  } else {
    fs.writeFile(filePath, `[${formDataJSON}]`, 'utf8', (err) => {
      if (err) {
        console.error('Erro ao escrever no arquivo:', err);
        return res.status(500).send('Erro ao escrever os dados no arquivo.');
      }
      res.send('Dados do formulário salvos com sucesso!');
    });
  }
});

// Rota para obter os dados do formulário
app.get('/obterFormularios', (req, res) => {
  const filePath = path.join(__dirname, 'data', 'formResponses.json');

  if (!fs.existsSync(filePath)) {
    return res.status(404).send('Nenhum dado de formulário encontrado.');
  }

  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      console.error('Erro ao ler o arquivo:', err);
      return res.status(500).send('Erro ao ler o arquivo de respostas.');
    }
    try {
      const formData = JSON.parse(data);
      res.json(formData);
    } catch (error) {
      console.error('Erro ao fazer parse do arquivo:', error);
      return res.status(500).send('Erro ao processar o arquivo de respostas.');
    }
  });
});

// Rota para atualizar o status de um candidato
app.post('/atualizarStatus', (req, res) => {
  const { idInGame, status } = req.body; // Usei idInGame para identificar o candidato
  const filePath = path.join(__dirname, 'data', 'formResponses.json');

  if (!fs.existsSync(filePath)) {
    return res.status(404).send('Nenhum dado de formulário encontrado.');
  }

  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      console.error('Erro ao ler o arquivo:', err);
      return res.status(500).send('Erro ao ler o arquivo de respostas.');
    }
    try {
      let formDataArray = JSON.parse(data);

      // Encontrar o candidato pelo ID
      const candidatoIndex = formDataArray.findIndex(candidato => candidato.idInGame === idInGame);

      if (candidatoIndex === -1) {
        return res.status(404).send('Candidato não encontrado.');
      }

      // Atualizar o status
      formDataArray[candidatoIndex].status = status;

      // Escrever os dados atualizados de volta no arquivo
      fs.writeFile(filePath, JSON.stringify(formDataArray, null, 2), 'utf8', (err) => {
        if (err) {
          console.error('Erro ao escrever no arquivo:', err);
          return res.status(500).send('Erro ao atualizar o status do candidato.');
        }
        res.send('Status do candidato atualizado com sucesso!');
      });
    } catch (error) {
      console.error('Erro ao fazer parse do arquivo:', error);
      return res.status(500).send('Erro ao processar o arquivo de respostas.');
    }
  });
});

// Iniciar o servidor
app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
