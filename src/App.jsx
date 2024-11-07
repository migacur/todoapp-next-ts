
import { Route, Routes } from 'react-router-dom'
import './App.css'
import Footer from './components/Footer'
import FormAdd from './components/FormAdd'
import Header from './components/Header'
import Home from './components/Home'
import Listado from './components/Listado'
import Editar from './components/Editar'
import Ingresar from './components/Ingresar'
import Registrar from './components/Registrar'
import Unauthorized from './components/Unauthorized'

function App() {

  return (
    <div className='flex flex-col h-screen justify-between'>
      <Header/>
      <main>
      <Routes>
      <Route path="/" element={<Home/>} />
      <Route path="/agregar" element={<FormAdd/>} />
      <Route path="/ingresar" element={<Ingresar/>} />
      <Route path="/registrar" element={<Registrar/>} />
      <Route path="/tareas" element={<Listado/>} />
      <Route path="/editar/:contactoId" element={<Editar/>} />
      <Route path="/401" element={<Unauthorized/>} />
      </Routes>
      </main>
      <Footer/>
    </div>
  )
}

export default App
