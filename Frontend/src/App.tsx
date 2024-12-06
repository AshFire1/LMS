import { createBrowserRouter } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar';
import Login from './pages/Login';
import HeroSection from './pages/student/HeroSection';
import MainLayout from './Layout/MainLayout';
const appRouter=createBrowserRouter(
  [
    {
      path:"/",
      element:<MainLayout/>,
      children:[
        
      ]
    }
  ]
)
function App() {

  return (
    <>
    <main>
      <Navbar/>
      <HeroSection/>
      <Login/>
    </main>
    </>
  )
}

export default App
