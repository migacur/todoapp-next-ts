import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import clienteAxios from "../../config/axios"
import Swal from "sweetalert2"

const Ingresar = () => {

  const [user,setUser]=useState([])
  const navigate=useNavigate()

  const leerInput = e => {
    setUser({...user, 
      [e.target.name] : e.target.value})
  }
  const loginUser = async e => {
    e.preventDefault();

    const {username,password}=user;

    if(!username || !password){
      Swal.fire({
        title: 'Error',
        text: 'Ambos campos son obligatorios',
        icon: 'error',
      })
      return;
    }

    try {
      console.log(user)
      const res = await clienteAxios.post('http://localhost/backend/api/controllers/login.php',user);
      console.log(res)
      if(res.status === 200){
          Swal.fire(
              'Login realizado',
               res.data.message,
              'success'
            )
     
           localStorage.setItem("user", JSON.stringify(res.data[0]));
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
    <form action="/localhost/backend/api/controllers/contacts.php" 
    method="post"  
    onSubmit={loginUser}
    className="flex justify-center place-content-center flex-col max-w-[400px] mx-auto ">
        <p className="font-bold text-[#404040] text-[1.2rem] uppercase my-2 text-center ">Ingresa a tu cuenta</p>
        <input type="text" name="username"  onChange={leerInput}
        placeholder="Ingresa tu username" className="block my-2 bg-gray-200 p-1 rounded-md outline-none border-none focus:bg-slate-300 shadow-sm "/>
        <input type="text" name="password"  onChange={leerInput} 
        placeholder="Ingresa tu password"
         className="block my-2 bg-gray-200 p-1 rounded-md outline-none border-none focus:bg-slate-300 shadow-sm"
        />
        <input type="submit" value="Ingresar" 
        className="mt-2 bg-blue-500 py-1 px-2 text-white rounded-md cursor-pointer hover:bg-blue-600 transition-all uppercase font-bold" />
    <Link to="/registrar" className="text-center text-slate-400 mt-2 text-[.8rem] font-bold">¿No tienes cuenta? Regístrate</Link>
    </form>
  )
}

export default Ingresar