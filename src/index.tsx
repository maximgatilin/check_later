import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import Theme from './utils/theme';
import { ContentProvider } from './utils/contexts/ContentContext';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <Theme>
      <ContentProvider>
        <App />
      </ContentProvider>
    </Theme>
  </React.StrictMode>
);
