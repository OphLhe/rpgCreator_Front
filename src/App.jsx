import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import HomePage from './Pages/HomePage'
import NavBar from './Components/Navbar'
import ConnexionPage from './Pages/ConnexionPage'; 
import Footer from './Components/Footer';
import CreationPage from './Pages/CreationPage';


function App() {

  return (
    <>
      
      <Router>
        <NavBar/>
        <Routes>
          <Route path='/' element={<HomePage/>}/>
          <Route path='/register' element={<ConnexionPage/>}/>
          <Route path='/login' element={<ConnexionPage/>}/>
          <Route path='/genreById/:idGenre' element={<CreationPage/>}/>
        </Routes>
        <Footer/>
      </Router>

    </>
  )
}

export default App
