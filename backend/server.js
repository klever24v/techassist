import express from 'express';
import cors from 'cors';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
app.use(cors());
app.use(express.json());

const documents = JSON.parse(fs.readFileSync(path.join(__dirname, 'documents.json')));

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