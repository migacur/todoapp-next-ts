
import Swal from "sweetalert2"
import clienteAxios from "../../config/axios"
import { useState } from "react"
import { useNavigate } from "react-router-dom"

const FormAdd = () => {

  const [data,setData]=useState([])
  const user = JSON.parse(localStorage.getItem("user"));
 const navigate = useNavigate()

  const createContact = async e => {
    e.preventDefault();

    const { nombres, telefono, direccion } = data;

    if(!nombres || !telefono || !direccion){
      Swal.fire({
        title: '',
        text: 'Los campos del nombre, teléfono y dirección son obligatorios.',
        icon: 'error',
      })
      return;
    }

    try {
         const res = await clienteAxios.post(`http://localhost/backend/api/controllers/user.php?userId=${user.usuario_id}`,data,{
          withCredentials: false
         });
        setData(res.data)
        Swal.fire(
          'Contacto Agregado',
           res.data.message,
          'success'
        )
      navigate("/tareas")
    } catch (e) {
      console.error('Error al enviar la solicitud:', e.message);
      Swal.fire({
        title: 'Error',
        text: e.message,
        icon: 'error',
      })
    }

  }



  const leerInput = e => {
    setData({...data, 
      [e.target.name] : e.target.value})
  }

  return (
    <form action="/localhost/backend/api/controllers/contacts.php" 
    method="post"  
    onSubmit={createContact}
    className="flex justify-center place-content-center flex-col max-w-[400px] mx-auto ">
        <svg xmlns="http://www.w3.org/2000/svg" className="mx-auto" fill="#038649" width="24" height="24" viewBox="0 0 24 24"><path d="M21 2H6a2 2 0 0 0-2 2v3H2v2h2v2H2v2h2v2H2v2h2v3a2 2 0 0 0 2 2h15a1 1 0 0 0 1-1V3a1 1 0 0 0-1-1zm-8 2.999c1.648 0 3 1.351 3 3A3.012 3.012 0 0 1 13 11c-1.647 0-3-1.353-3-3.001 0-1.649 1.353-3 3-3zM19 18H7v-.75c0-2.219 2.705-4.5 6-4.5s6 2.281 6 4.5V18z"/></svg>
        <p className="font-bold text-[#404040] text-[1.2rem] uppercase my-2 text-center ">Ingresar nuevo contacto</p>
        <input type="text" name="nombres"  onChange={leerInput}
        placeholder="Ingresa el nombre y apellido" className="block my-2 bg-gray-200 p-1 rounded-md outline-none border-none focus:bg-slate-300 shadow-sm "/>
        <input type="number" name="telefono"  onChange={leerInput} 
        placeholder="Ingresa el teléfono"
         className="block my-2 bg-gray-200 p-1 rounded-md outline-none border-none focus:bg-slate-300 shadow-sm"
        />
         <input type="email" name="email" onChange={leerInput} 
        placeholder="Ingresa el email"
         className="block my-2 bg-gray-200 p-1 rounded-md outline-none border-none focus:bg-slate-300 shadow-sm"
        />
        <input type="text" name="direccion"  onChange={leerInput} 
        placeholder="Ingresa la dirección"
         className="block my-2 bg-gray-200 p-1 rounded-md outline-none border-none focus:bg-slate-300 shadow-sm"
        />
         <label htmlFor="imagen" className="mx-auto w-[200px] my-2 relative inline-block px-4 py-1 font-semibold text-white bg-slate-500 text-center rounded cursor-pointer hover:bg-slate-600 active:bg-slate-700 focus:outline-none focus:ring focus:ring-blue-200 text-[.9rem] uppercase ">
          {data.foto? 'Foto Cargada' : 'Subir foto (Opcional)'}
        </label>
        <input type="file" id="imagen" name="foto" accept="image/*" onChange={leerInput} className="hidden"/>
        <input type="submit" value="Agregar Contacto" 
        className="mt-2 bg-blue-500 py-1 px-2 text-white rounded-md cursor-pointer hover:bg-blue-600 transition-all uppercase font-bold" />
    </form>
  )
}

export default FormAdd