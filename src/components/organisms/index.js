import React from 'react';

// podría pasarsele un ID para saber qué se clickeó anteriormente.
const triggerWarning = (id, type) => {
  switch(type){
    case 'propiedad': alert(`Esta seguro de eliminar la propiedad ${id}`); break;
    case 'reserva':  alert(`Esta seguro de eliminar la reserva ${id}`); break;
    case 'tipoPropiedad': alert(`Esta seguro de eliminar el tipo de propiedad ${id}`); break;
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

export const DeleteButton = ({ children, className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-700 transition duration-300" ,  entityId, type, ...props }) => {
  return <button {...props} className={`${className}`} onClick={() => triggerWarning(entityId, type)}>{children}</button>
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