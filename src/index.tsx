import React from 'react';
import ReactDOM from 'react-dom/client';
import { Simulator } from './simulator/simulator';
import { WithContextProvider } from './contexts/with-context';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <WithContextProvider>
      <Simulator />
    </WithContextProvider>
  </React.StrictMode>
);
