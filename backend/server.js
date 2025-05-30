const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
app.use(cors());
app.use(express.json());

const documents = JSON.parse(fs.readFileSync('./documents.json'));

app.get('/documents', (req, res) => {
  res.json(documents.map(doc => path.basename(doc.name, '.pdf')));
});

app.post('/document/load', (req, res) => {
  const { name } = req.body;
  const doc = documents.find(d => d.name.includes(name));
  if (!doc) return res.status(404).json({ error: 'Documento no encontrado' });
  const content = fs.readFileSync(doc.path, 'utf-8');
  res.json({ content });
});

app.listen(3001, () => console.log('Servidor backend en http://localhost:3001'));