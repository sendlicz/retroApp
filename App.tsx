import React from 'react';

import { ThemeProvider } from './src/theming';
import { Container } from './src/navigation';
import { SprintsProvider } from './src/components/Sprints';

export default function App() {
  return (
    <ThemeProvider>
      <SprintsProvider>
        <Container />
      </SprintsProvider>
    </ThemeProvider>
  );
}
