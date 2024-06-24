import React, { useState, useEffect } from 'react';
import { LoadingSpinner, StyledInput, SubmitButton } from '../../../components/organisms'
import { sendData } from '../../../utils/requests';
import { validateEmpty } from '../../../utils';
import Swal from 'sweetalert2';

export default function LocalidadForm({link, method, localidad = null, titleMessage, buttonMessage}){
  const [inputValue, setInputValue] = useState(localidad? localidad.nombre : '');
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState();
  const [formData, setFormData] = useState({ nombre: '' });
  
  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  }

  useEffect(() => {
    setFormData({ nombre: inputValue })
  }, [inputValue])
  
  const handleSubmit = async (event, method, link) => {
    event.preventDefault();
    setLoading(true);
    if (validateEmpty(formData.nombre)) {
        try {
        let res = await sendData({link, method, data: formData, setLoading: setLoading, setData})
        if (res.code === 200 || res.code === 201) {
          Swal.fire({
            title: '¡Listo!',
            text: res.data,
            icon: 'success',
            confirmButtonText: 'Ok'
          }).then(() => {
            window.location.href = '/localidades';
          });
          setLoading(false);
        } else {
          Swal.fire({
            title: '¡Error!',
            text: 'No pudo cargarse la localidad',
            icon: 'error',
            timer : 2000
          })
          setLoading(false);
        }
      } catch (error) {
        console.log(error)
      }
      } else {
        Swal.fire({
          title: '¡Error!',
          text: 'El nombre no puede ser vacio',
          icon: 'error',
          timer : 1500
        })
      }
  };

  function showData(){
    return (
      <div className="flex items-center justify-center h-full">
        <form 
          onSubmit={(e) => handleSubmit(e, method, link)} 
          className="bg-white p-6 rounded shadow-md w-full max-w-sm"
        >
          <h2 className="text-2xl mb-4 text-center">{titleMessage}</h2>
           {data && <p className={data.error ? 'text-red-500':'text-green-500'}>{data.error ? data.error : data.data}</p>} 
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="textInput">
              Nombre
            </label>
            <StyledInput name="nombre" type="text" id="textInput" placeholder="Nombre de localidad" value={inputValue} onChange={handleInputChange} required minLength={1}/>
          </div>
          <div className="flex justify-center">
            <SubmitButton text={buttonMessage} />
          </div>
        </form>
      </div>
    )
  }

  return (
    <>
    {loading ? <LoadingSpinner /> : showData()}
    </>
  )
};