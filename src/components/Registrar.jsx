import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import clienteAxios from "../../config/axios"
import Swal from "sweetalert2"

const Registrar = () => {

    const [user,setUser]=useState([])
    const navigate = useNavigate()

    const leerInput = e => {
        setUser({...user, 
          [e.target.name] : e.target.value})
      }
    const registarUsuario = async e => {

      e.preventDefault();
      const {username,email,password,repeat_password} = user;

      if(!username || !email || !password || !repeat_password){
        Swal.fire({
          title: 'Error',
          text: 'Todos los campos son obligatorios',
          icon: 'error',
        })
        return;
      }
        try {
            console.log(user)
            const res = await clienteAxios.post('http://localhost/backend/api/controllers/registro.php',user);
            console.log(res)
            if(res.status === 200){
                Swal.fire(
                    'Usuario Registrado',
                     res.data.message,
                    'success'
                  )
                  navigate("/")
            }
          
      
       } catch (e) {
         console.error('Error al enviar la solicitud:', e.message);
         Swal.fire({
           title: 'Error',
           text: e.response.data.message,
           icon: 'error',
         })
       }
   
    }

  return (
    <form action="/localhost/backend/api/controllers/registro.php" 
    method="post"  
    onSubmit={registarUsuario}
    className="flex justify-center place-content-center flex-col max-w-[400px] mx-auto ">
        <p className="font-bold text-[#404040] text-[1.2rem] uppercase my-2 text-center ">Registrar nueva cuenta</p>
        <input type="text" name="username"  onChange={leerInput}
        placeholder="Ingresa tu username" className="block my-2 bg-gray-200 p-1 rounded-md outline-none border-none focus:bg-slate-300 shadow-sm "/>
        <input type="email" name="email"  onChange={leerInput} 
        placeholder="Ingresa tu email"
         className="block my-2 bg-gray-200 p-1 rounded-md outline-none border-none focus:bg-slate-300 shadow-sm"
        />
        <input type="password" name="password"  onChange={leerInput} 
        placeholder="Ingresa tu password"
         className="block my-2 bg-gray-200 p-1 rounded-md outline-none border-none focus:bg-slate-300 shadow-sm"
        />
        <input type="password" name="repeat_password"  onChange={leerInput} 
        placeholder="Repite tu password"
         className="block my-2 bg-gray-200 p-1 rounded-md outline-none border-none focus:bg-slate-300 shadow-sm"
        />
        <input type="submit" value="Registrarme" 
        className="mt-2 bg-blue-500 py-1 px-2 text-white rounded-md cursor-pointer hover:bg-blue-600 transition-all uppercase font-bold" />
        <Link to="/ingresar" className="text-center text-slate-400 mt-2 text-[.8rem] font-bold">¿Ya tienes cuenta? Ingresa aquí</Link>
    </form>
  )
}

export default Registrar