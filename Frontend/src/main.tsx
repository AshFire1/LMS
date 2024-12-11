import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { Provider } from 'react-redux'
import { appStore } from './app/store.ts'
import { Toaster } from 'sonner'
import { useGetUserQuery } from './features/api/authApi.ts'
const Custom=({children}:any)=>{
  const {isLoading}=useGetUserQuery({});
  return (
    <>
      {
        isLoading?<h1> Loading..</h1 > :<>{children}</>
      }
    </>
  );
}
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={appStore}>
      <Custom>
      <App /> 
      <Toaster/>
      </Custom>
    
   
    </Provider>
    
  </StrictMode>,
)
