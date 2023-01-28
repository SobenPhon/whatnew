import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { PostContextProvider } from './context/PostContext'
import { DashPostContextProvider } from './context/DashPostContext';
import { ThemeContextProvider } from './context/ThemeContext';
import { AuthContextProvider } from './context/AuthContext';
import { BrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { disableReactDevTools } from '@fvilers/disable-react-devtools'

if (process.env.NODE_ENV === 'production') disableReactDevTools()

const queryClient = new QueryClient()

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthContextProvider>
        <ThemeContextProvider >
          <DashPostContextProvider>
            <PostContextProvider>
              {/* <BrowserRouter> */}
              <App />
              {/* </BrowserRouter> */}
            </PostContextProvider>
          </DashPostContextProvider>
        </ThemeContextProvider>
      </AuthContextProvider>
    </QueryClientProvider>
  </React.StrictMode>
);
