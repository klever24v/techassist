import React from 'react';
import { CopilotKit } from '@copilotkit/react-core';
import { CopilotChat } from '@copilotkit/react-ui';
import useDocumentCopilot from './hooks/useDocumentCopilot';

function App() {
  useDocumentCopilot();

  return (
    <CopilotKit publicApiKey={process.env.REACT_APP_COPILOTKIT_API_KEY}>
      <CopilotChat />
    </CopilotKit>
  );
}

export default App;
