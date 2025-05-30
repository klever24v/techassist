import { useCopilotAction } from '@copilotkit/react-core';

function useDocumentCopilot() {
  useCopilotAction({
    name: 'buscarDocumento',
    description: 'Busca un documento según el modelo del dispositivo',
    parameters: { modelo: 'string' },
    handler: async ({ modelo }) => {
      const res = await fetch('http://localhost:3001/documents');
      const docs = await res.json();
      const match = docs.find(d => d.toLowerCase().includes(modelo.toLowerCase()));
      if (!match) return `No se encontró ningún manual para el modelo ${modelo}.`;

      const loadRes = await fetch('http://localhost:3001/document/load', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: match })
      });

      const { content } = await loadRes.json();
      return `He cargado el manual del modelo ${modelo}. Puedes preguntarme sobre él.\n\n${content.slice(0, 1500)}...`;
    }
  });
}

export default useDocumentCopilot;