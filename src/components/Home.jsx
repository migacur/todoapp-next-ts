import { Link } from 'react-router-dom';
import foto from '../../public/foto.jpg';

const Home = () => {
  return (
    <div className='w-[100%] flex flex-col items-center'>
            <img src={foto} className='mt-1 d-block py-2 m-auto w-[500px] h-[400px] ' alt='imagen'/>
            <Link to="/agregar"
             className='uppercase mt-5 bg-blue-500 py-2 px-4 rounded-md text-center text-white font-semibold w-[300px] outline-none border-none hover:bg-blue-600 transition-all'>
                Agregar Contacto
            </Link>
            <Link to="/tareas"
             className='uppercase mt-5 bg-blue-500 py-2 px-4 rounded-md text-center text-white font-semibold w-[300px] outline-none border-none hover:bg-blue-600 transition-all'>
                Mis Contactos
            </Link>
    </div>
  )
}

export default Home