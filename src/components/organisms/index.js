import React, { useState } from 'react';
import Swal from 'sweetalert2';
import { deleteData } from '../../utils/index';

// EL MODAL DE ELIMINAR ROMPE LOS ESTILOS EN TIPO PROPIEDAD
// CUANDO ALGO SE ELIMINA, NO SE VUELVE A RE-RENDERIZAR
// CUANDO LA RESPUESTA ES CORRECTA EN RESERVA ME IMPRIMIO OBJECT, VER COMO SE ACCEDE CORRECTAMENTE AL MENSAJE.
const AlertaConfirmacionBorrado = async(mensaje,mensajeConfirm, type, id, setLoading) => {
  const result = await Swal.fire({
    title: "Esta seguro que desea borrar?",
    text: mensaje,
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Confirmar"
  })
    if (result.isConfirmed) {
      try {
        Swal.fire({
          title: 'Borrando...',
          text: 'Por favor espere',
          icon: 'info',
          allowOutsideClick: false,
          didOpen: () => {
            Swal.showLoading();
          }
        });
        const payload = await deleteData({link: `${type}/${id}`, id, setLoading: setLoading});
        Swal.fire({
          title: payload.error ? "Error" : "Borrado!",
          text: payload.error ? payload.error : payload.data,
          icon: payload.error ? "error" : 'success'
        });
      } catch (error) {
        Swal.fire({
          title: "Error",
          text: error,
          icon: "error"
        });
      }
    }
  };

const triggerWarning = (id, type, setLoading) => {
  switch(type){
    case 'propiedades': AlertaConfirmacionBorrado(`Esta seguro de eliminar la propiedad ${id}`, 'borrado! (aun no hace nada)', type, id, setLoading); break;
    case 'reservas':  AlertaConfirmacionBorrado(`Esta seguro de eliminar la reserva ${id}`, 'borrado! (aun no hace nada)', type, id, setLoading); break;
    case 'tipos_propiedad': AlertaConfirmacionBorrado(`Esta seguro de eliminar el tipo de propiedad ${id}`, 'borrado! (aun no hace nada)', type, id, setLoading); break;
  }
}

export const GridDiv = ({ children, className = 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-4' }) => {
  return <div className={`${className}`}>{children}</div>;
};

export const EditButton = ({ children, className= 'bg-blue-500 text-white py-1 px-2 rounded hover:bg-blue-700 transition duration-300', ...props }) => {
  return <button {...props} className={`${className}`}>{children}</button>
}

export const EditRedirectButton = ({ children, className= 'bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700 transition duration-300', ...props }) => {
  return <a {...props} className={`${className}`}>{children}</a>
}

export const DeleteButton = ({ children, className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-700 transition duration-300" , setLoading, entityId, type, ...props }) => {
  return <button {...props} className={`${className}`} onClick={() => triggerWarning(entityId, type, setLoading)}>{children}</button>
}

export const StyledInput = ({children, className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline", type, value, label, id, name, placeholder, onChange, ...props}) => {
  return <input 
    className={`${className}`}
    type={type}
    id={id}
    name={name}
    placeholder={placeholder}
    value={value} 
    onChange={onChange}
    {...props}></input>
}

export const SubmitButton = ({ children, className= 'bg-blue-500 text-white py-1 px-2 rounded hover:bg-blue-700 transition duration-300', text, ...props }) => {
  return <button {...props} className={`${className}`}>{text}</button>
}