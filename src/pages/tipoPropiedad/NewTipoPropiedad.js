import React, { useState, useEffect } from 'react';
import { StyledInput, SubmitButton } from '../../components/organisms/index.js'
import { sendData } from '../../utils/index';

const FormComponent = () => {
  const [inputValue, setInputValue] = useState('');
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState({});
  const [formData, setFormData] = useState({ nombre: '' });

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
    console.log(event.target.value);
    console.log(inputValue, 'VALOR DEI NPUT')
  }

  useEffect(() => {
    setFormData({ nombre: inputValue })
  }, [inputValue])
  
  const handleSubmit = (event) => {
    event.preventDefault();
    sendData({link: 'tipos_propiedad', method:'POST', data: formData, setLoading: setLoading, setData})
  };

  return (
    <div className="flex items-center justify-center h-full">
      <form 
        onSubmit={handleSubmit} 
        className="bg-white p-6 rounded shadow-md w-full max-w-sm"
      >
        <h2 className="text-2xl mb-4 text-center">Crear tipo de propiedad</h2>
        {data && <p className={data.error ? 'text-red-500':'text-green-500'}>{data.error ? data.error : data}</p>}
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="textInput">
            Nombre
          </label>
          <StyledInput name="nombre" value={inputValue} onChange={handleInputChange}/>
        </div>
        <div className="flex justify-center">
          <SubmitButton text="Agregar Tipo"/>
        </div>
      </form>
    </div>
  );
};

export default FormComponent;


// import React from 'react'

// function NewTipoPropiedad() {
//   return (
//     <div></div>
//   )
// }

// export default NewTipoPropiedad

// // formulario con nombre y mostrar mensaje del backend.