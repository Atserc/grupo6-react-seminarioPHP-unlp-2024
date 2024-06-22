import React, { useState, useEffect } from 'react'
import { StyledInput, StyledSelect, SubmitButton } from '../../organisms'
import { sendData } from '../../../utils/requests'
import { validarFormulario } from '../../../utils';

export default function ReservaForm({ link, method, reserva = null, inquilinos, propiedades, titleMessage, buttonMessage}) {
  const [loading, setLoading] = useState();
  const [message, setMessage] = useState('')
  const [response, setResponse] = useState();
  const [formData, setFormData] = useState({
    propiedad_id: '',
    inquilino_id: '',
    cantidad_noches: '',
    fecha_desde: ''
  });

  useEffect(() => {
    if (reserva) {
      setFormData(reserva);
    }
  }, [reserva]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name!=='fecha_desde' ? Number(value): value,
    });
    console.log(formData);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Formulario enviado:', formData);
    if (validarFormulario(formData, 'reserva')) {
      try {
        setLoading(true);
        setMessage(reserva ? 'Actualizando reserva...' : 'Confirmando reserva...');
        const res =  await sendData({link, method, data: formData, setLoading: setLoading, setData: setResponse})
        console.log(res, 'HOLA')
        if (res.code !== 200) {
          setMessage(reserva ? 'No se pudo actualizar' : 'Verificá que el formulario sea correcto.');
        } else {
          setMessage(reserva ? 'Reserva actualizada' : 'Reserva confirmada');
        }
      } catch (error) {
        console.log(error)
      }
    } else {
      setMessage('El formulario es inválido.')
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen py-5">
      <div className="w-full max-w-2xl p-8 bg-gray-200 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold mb-6 text-center">{titleMessage}</h1>
        <form  onSubmit={handleSubmit} className="grid grid-cols-1 gap-6">
          <div className="grid grid-cols-2 gap-4 items-center">
            <div className="flex-flex-col">
            {response && response?.error?.noches ? <p className="text-red-500">{response.error.noches}</p> : ''}
           <StyledInput required onChange={handleChange} name="cantidad_noches" id="cantidad_noches" label="Cantidad Noches" value={formData.cantidad_noches} type="number"/>
           
            </div>
            <div className="flex flex-col">
            {response && response?.error?.fechaVacia ? <p className="text-red-500">{response.error.fechaVacia}</p> : ''}
            {response && response?.error?.fecha ? <p className="text-red-500">{response.error.fecha}</p> : ''}
           <StyledInput required onChange={handleChange} name="fecha_desde" id="fecha_desde" label="Fecha Desde" value={formData.fecha_desde} type="date"/>
           
            </div>
            <div className="flex flex-col">
            {response && response?.error?.inquilino ? <p className="text-red-500">{response.error.inquilino}</p> : ''}
           <StyledSelect required onChange={handleChange} selectedIdOption={formData.inquilino_id} options={inquilinos} entityType="inquilinos" name="inquilino_id" label="Seleccionar Inquilino" id="inquilino_id" placeholder="Seleccione un inquilino" />
          
            </div>
            <div className="flex flex-col">
            {response && response?.error?.propiedad ? <p className="text-red-500">{response.error.propiedad}</p> : ''}
           <StyledSelect required onChange={handleChange} selectedIdOption={formData.propiedad_id} options={propiedades} entityType="propiedades" name="propiedad_id" label="Seleccionar Propiedad" id="propiedad_id" placeholder="Seleccione una propiedad" />
        
            </div>
              </div>
          <div className="flex justify-center mt-6">
          <div>{response && response.data ? <p className="text-red-500">{response.data.data}</p> : ''}</div>
          <div className="flex flex-col">
          <SubmitButton text={buttonMessage} />
          {/* <SubmitButton onClick={handleSubmit} text={buttonMessage} /> */}
          {<p className={message === "Confirmando reserva..." || message === "Actualizando reserva..." || message === "Reserva actualizada" || message==="Reserva confirmada" ? 'text-green-500' :"text-red-500"}>{message}</p>}
          {/* {(loading==true)? <p>Por favor, espere...</p>:''} */}
          </div>
          {/* {(reserva==null)? (loading==true ? <p>Confirmando reserva...</p> : <p>Reserva Confirmada</p>) : (loading == true? <p>Actualizando reserva...</p> : <p>Reserva actualizada!</p>)}  */}
          </div>
        </form>
      </div>
    </div>
  )
}