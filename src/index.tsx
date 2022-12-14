import * as React from 'react';
import { createRoot } from 'react-dom/client';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';
import App from './App';
import theme from './theme';
import { BrowserRouter } from 'react-router-dom';
import { APP_ENV } from './globalVars';
import { worker } from './mocks/browser';

if (APP_ENV === 'development') {
  worker.start();
} else {
  worker.stop();
}

const rootElement = document.getElementById('root');
const root = createRoot(rootElement!);

root.render(
  <ThemeProvider theme={theme}>
    <CssBaseline />
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </ThemeProvider>
);
