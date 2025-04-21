import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { AppWriteContextProvider } from './context/AppwriteContext.jsx'
import { Toaster } from 'react-hot-toast'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    
    <AppWriteContextProvider>
    <App />
  </AppWriteContextProvider>
  </StrictMode>,
)
