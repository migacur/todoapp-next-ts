import { Link, useNavigate } from "react-router-dom"
import Swal from "sweetalert2";

const Header = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const navigate=useNavigate()

  const cerrarSesion = () => { 
    localStorage.clear()
    navigate("/")
    Swal.fire(
      'Sesión finalizada',
       '¡Has cerrado tu sesión, esperamos volver a verte pronto!',
      'success'
    )
  }

  return (
    <header className="bg-blue-500 pt-4 text-fuchsia-50 uppercase text-[1.5rem] text-center ">
       <Link to="/"><h1 className="font-bold inline-block mx-auto pb-4">Contacts App</h1></Link> 
        <nav className="text-[1rem] flex justify-center place-content-center bg-blue-400 py-1">
         { user ? 
          <>
          <p className="font-bold">Sesión Activa: {user.username}</p>
          <button onClick={cerrarSesion}
          className="bg-red-500 px-2 text-center font-bold ml-2 rounded-md flex justify-center place-content-center hover:bg-red-600 transition-all">X</button>
          </>
          :
          <div className="w-[400px] mx-auto  flex justify-around">
          <Link to="/ingresar" className="font-bold hover:text-blue-700 transition-all">Ingresar</Link>
          <Link to="/registrar" className="font-bold hover:text-blue-700 transition-all">REGISTRARME</Link>
          </div>
          }
        </nav>
    </header>
  )
}

export default Header