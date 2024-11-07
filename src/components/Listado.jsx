import { useEffect, useState } from "react";
import clienteAxios from "../../config/axios";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import Spinner from "./Spinner";

const Listado = () => {

  const navigate = useNavigate()
  const [load,isLoad]=useState(true)
    const [data,setData]=useState([])
    const user = JSON.parse(localStorage.getItem("user"));
  
     useEffect(() => {

      if(!user){
        return navigate("/401")
      }

        const mostrarData = async ()=> {
            isLoad(false)
            try {
                 const res = await clienteAxios.get(`http://localhost/backend/api/controllers/mostrar.php?userId=${user.usuario_id}`);
                 setData(res.data)
               
            } catch (e) {
              console.error('Error al enviar la solicitud:', e.message);
              Swal.fire({
                title: 'Ha ocrrido un error',
                text: e.message,
                icon: 'error',
              })
            }
            isLoad(true)
          }
        mostrarData()
     // eslint-disable-next-line react-hooks/exhaustive-deps
     }, [])
     
     const eliminarContacto = async contactoId => {
      try {
        const res = await clienteAxios.delete(`http://localhost/backend/api/controllers/eliminar.php?contactoId=${contactoId}`);
        console.log(res)
        if(res.status === 200){
        Swal.fire(
          'Contacto Eliminado',
          'Has eliminado el contacto seleccionado',
          'success'
        )
      }
   } catch (e) {
     console.error('Error al enviar la solicitud:', e.message);

   }
     }

     if(!load) return <Spinner/>

  return (
    <>
    
    <h1 className="text-center text-2xl font-bold uppercase text-gray-500 py-1 ">{data.length ? "Mis Contactos" : "NO hay contactos agregados"}</h1>

    <div className="flex justify-between flex-wrap mt-4 max-w-[90%] mx-auto">

            {data.length &&
            data.map(contacto => (
            <div key={contacto.contacto_id} className="min-w-[300px] bg-slate-200 my-2 py-3 text-center rounded-md text-[#404040] shadow-sm ">
            <div className="flex justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" fill="#0c78c0" width="24" height="24" viewBox="0 0 24 24"><path d="M21 2H6a2 2 0 0 0-2 2v3H2v2h2v2H2v2h2v2H2v2h2v3a2 2 0 0 0 2 2h15a1 1 0 0 0 1-1V3a1 1 0 0 0-1-1zm-8 2.999c1.648 0 3 1.351 3 3A3.012 3.012 0 0 1 13 11c-1.647 0-3-1.353-3-3.001 0-1.649 1.353-3 3-3zM19 18H7v-.75c0-2.219 2.705-4.5 6-4.5s6 2.281 6 4.5V18z"/></svg>
            <h2 className="ml-1">{contacto.nombres}</h2>
            </div>
            <div className="flex justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" fill="#10b470" width="24" height="24" viewBox="0 0 24 24"><path d="m20.487 17.14-4.065-3.696a1.001 1.001 0 0 0-1.391.043l-2.393 2.461c-.576-.11-1.734-.471-2.926-1.66-1.192-1.193-1.553-2.354-1.66-2.926l2.459-2.394a1 1 0 0 0 .043-1.391L6.859 3.513a1 1 0 0 0-1.391-.087l-2.17 1.861a1 1 0 0 0-.29.649c-.015.25-.301 6.172 4.291 10.766C11.305 20.707 16.323 21 17.705 21c.202 0 .326-.006.359-.008a.992.992 0 0 0 .648-.291l1.86-2.171a.997.997 0 0 0-.085-1.39z"/></svg>
            <p className="ml-1">{contacto.telefono}</p>
            </div>
            <div className="flex justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" fill="#c0630c" width="24" height="24" viewBox="0 0 24 24"><path d="M20 4H4c-1.103 0-2 .897-2 2v12c0 1.103.897 2 2 2h16c1.103 0 2-.897 2-2V6c0-1.103-.897-2-2-2zm0 2v.511l-8 6.223-8-6.222V6h16zM4 18V9.044l7.386 5.745a.994.994 0 0 0 1.228 0L20 9.044 20.002 18H4z"/></svg>
            <p className="ml-1">{contacto.email}</p>
            </div>
            <div className="flex justify-center mb-3">
            <svg xmlns="http://www.w3.org/2000/svg" fill="#c00c0c" width="24" height="24" viewBox="0 0 24 24"><path d="M12 22s8.029-5.56 8-12c0-4.411-3.589-8-8-8S4 5.589 4 9.995C3.971 16.44 11.696 21.784 12 22zM8 9h3V6h2v3h3v2h-3v3h-2v-3H8V9z"/></svg>
            <p className="ml-1">{contacto.direccion}</p>
            </div>
            <Link to={`/editar/${contacto.contacto_id}`} className="inline-block w-[100px] bg-green-400 py-1 px-3 rounded-md text-white font-bold text-[.8rem] mr-2 hover:bg-green-500 transition-all">Editar</Link>
            <button onClick={()=>eliminarContacto(contacto.contacto_id)}
            className="w-[100px] bg-red-400 py-1 px-3 rounded-md text-white font-bold text-[.8rem] hover:bg-red-500 transition-all">Eliminar</button>
            </div>
         
    )) }

    </div>
    </>
  )
}

export default Listado