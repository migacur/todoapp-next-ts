import { useEffect, useState } from "react"
import clienteAxios from "../../config/axios"
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";

const Editar = () => {

    const { contactoId } = useParams();
    const navigate = useNavigate();
    const [contacto,setContacto]=useState([])
    const [data,setData]=useState([])

    
    const cargarData = async () => {
      try {
          const res = await clienteAxios.get(`http://localhost/backend/api/controllers/contacto.php?contactoId=${contactoId}`);
          setContacto(res.data)

     } catch (e) {
       console.error('Error al enviar la solicitud:', e.message);
     }
  }

    useEffect(() => {
        cargarData()
    }, [])
    

    
  const leerInput = e => {
    setData({...data, 
      contactoId: contactoId,
      [e.target.name] : e.target.value})
  }

    const editContact = async e => {
    e.preventDefault();

    const { nombres, telefono, email, direccion } = contacto;

    const newData = {
      contactoId: contactoId,
      nombres: nombres? nombres : data.titulo,
      telefono: telefono? telefono : data.telefono,
      email: email? email : data.email,
      direccion: direccion ? direccion : data.direccion
  }

   try {
          console.log(newData)
          const res = await clienteAxios.post('http://localhost/backend/api/controllers/editar.php', newData, { withCredentials: true })
          if(res.status === 200){
            Swal.fire(
              'Contacto Editado',
              'Has modificado el contacto seleccionado',
              'success'
            )
          }
       navigate("/")
     } catch (e) {
       console.error('Error al enviar la solicitud:', e.message);
     }
    }
   


  return (
    <form action='http://localhost/backend/api/controllers/editar.php'
    method="post"  
    onSubmit={editContact}
    className="flex justify-center place-content-center flex-col max-w-[400px] mx-auto ">
        <svg xmlns="http://www.w3.org/2000/svg" className="mx-auto" fill="#038649" width="24" height="24" viewBox="0 0 24 24"><path d="m7 17.013 4.413-.015 9.632-9.54c.378-.378.586-.88.586-1.414s-.208-1.036-.586-1.414l-1.586-1.586c-.756-.756-2.075-.752-2.825-.003L7 12.583v4.43zM18.045 4.458l1.589 1.583-1.597 1.582-1.586-1.585 1.594-1.58zM9 13.417l6.03-5.973 1.586 1.586-6.029 5.971L9 15.006v-1.589z"/><path d="M5 21h14c1.103 0 2-.897 2-2v-8.668l-2 2V19H8.158c-.026 0-.053.01-.079.01-.033 0-.066-.009-.1-.01H5V5h6.847l2-2H5c-1.103 0-2 .897-2 2v14c0 1.103.897 2 2 2z"/></svg>
        <p className="font-bold text-[#404040] text-[1.2rem] uppercase my-2 text-center ">Editar Contacto seleccionado</p>
        <input type="text" name="nombres" defaultValue={contacto?.nombres} onChange={leerInput}
        placeholder="Ingresa el nombre y apellido" className="block my-2 bg-gray-200 p-1 rounded-md outline-none border-none focus:bg-slate-300 shadow-sm "/>
        <input type="number" name="telefono" defaultValue={contacto?.telefono}  onChange={leerInput} 
        placeholder="Ingresa el teléfono"
         className="block my-2 bg-gray-200 p-1 rounded-md outline-none border-none focus:bg-slate-300 shadow-sm"
        />
         <input type="email" name="email" defaultValue={contacto?.email}  onChange={leerInput} 
        placeholder="Ingresa el email"
         className="block my-2 bg-gray-200 p-1 rounded-md outline-none border-none focus:bg-slate-300 shadow-sm"
        />
        <input type="text" name="direccion" defaultValue={contacto?.direccion}  onChange={leerInput} 
        placeholder="Ingresa la dirección"
         className="block my-2 bg-gray-200 p-1 rounded-md outline-none border-none focus:bg-slate-300 shadow-sm"
        />
         <label htmlFor="imagen" className="mx-auto w-[200px] my-2 relative inline-block px-4 py-1 font-semibold text-white bg-slate-500 text-center rounded cursor-pointer hover:bg-slate-600 active:bg-slate-700 focus:outline-none focus:ring focus:ring-blue-200 text-[.9rem] uppercase ">
          {data.foto? 'Cambiar Foto' : 'Insertar Foto'}
        </label>
        <input type="file" id="imagen" name="foto" accept="image/*" onChange={leerInput} className="hidden"/>
        <input type="submit" value="Editar Contacto" 
        className="mt-2 bg-blue-500 py-1 px-2 text-white rounded-md cursor-pointer hover:bg-blue-600 transition-all uppercase font-bold" />
    </form>
  )
}

export default Editar