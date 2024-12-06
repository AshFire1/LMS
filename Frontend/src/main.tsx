import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { Provider } from 'react-redux'
import { appStore } from './app/store.ts'
import { Toaster } from 'sonner'
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={appStore}>
    <App />
    <Toaster/>
    </Provider>
    
  </StrictMode>,
)
