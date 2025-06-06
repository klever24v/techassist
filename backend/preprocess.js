import fs from 'fs';
import path from 'path';
import pdf from 'pdf-parse';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const pdfFolder = path.join(__dirname, 'pdfs');
const mdFolder = path.join(__dirname, 'markdowns');

async function convertPdfToMarkdown(filePath) {
  const dataBuffer = fs.readFileSync(filePath);
  const data = await pdf(dataBuffer);
  return `# ${path.basename(filePath)}\n\n${data.text}`;
}

async function processAllPDFs() {
  const files = fs.readdirSync(pdfFolder).filter(f => f.endsWith('.pdf'));
  const index = [];

  if (!fs.existsSync(mdFolder)) fs.mkdirSync(mdFolder);

  for (const file of files) {
    const mdContent = await convertPdfToMarkdown(path.join(pdfFolder, file));
    const outputPath = path.join(mdFolder, file.replace('.pdf', '.md'));
    fs.writeFileSync(outputPath, mdContent, 'utf-8');
    index.push({ name: file, path: outputPath });
  }

  fs.writeFileSync(path.join(__dirname, 'documents.json'), JSON.stringify(index, null, 2));
}

processAllPDFs();