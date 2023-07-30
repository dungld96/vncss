import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { ReactRouter6Adapter } from 'use-query-params/adapters/react-router-6';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { store } from './state/store';
import { Provider } from 'react-redux';
import { ThemeProvider } from '@mui/material';
import { theme } from 'configs/theme';
import AuthMiddleware from 'common/Middleware/AuthMiddleware';
import { QueryParamProvider } from 'use-query-params';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <ThemeProvider theme={theme}>
    {/* <React.StrictMode> */}
    <BrowserRouter>
      <QueryParamProvider adapter={ReactRouter6Adapter}>
        <Provider store={store}>
          <AuthMiddleware>
            <App />
          </AuthMiddleware>
        </Provider>
      </QueryParamProvider>
    </BrowserRouter>
    {/* </React.StrictMode> */}
  </ThemeProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
