import React, { useState, useEffect } from 'react'
import { StyledInput, StyledSelect, SubmitButton } from '../../organisms'
import { sendData } from '../../../utils/requests'

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
    // console.log(name, value)
    setFormData({
      ...formData,
      [name]: name!='fecha_desde' ? Number(value): value,
    });
    console.log(formData, 'HOLA');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Aquí puedes enviar formData a tu backend
    console.log('Formulario enviado:', formData);
    try {
      setLoading(true);
      setMessage(reserva ? 'Actualizando reserva...' : 'Confirmando reserva...');
      const res =  await sendData({link, method, data: formData, setLoading: setLoading, setData: setResponse})
      console.log(res)
      if (res.code != 200) {
        setMessage(reserva ? 'No se pudo actualizar' : 'No se pudo crear');
      } else {
        setMessage(reserva ? 'Reserva actualizada' : 'Reserva confirmada');
      }
    } catch (error) {
      console.log(error)
    }
  };
  return (
    <div className="flex justify-center items-center min-h-screen py-5">
      <div className="w-full max-w-2xl p-8 bg-gray-200 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold mb-6 text-center">{titleMessage}</h1>
        <form className="grid grid-cols-1 gap-6">
          <div className="grid grid-cols-2 gap-4 items-center">
            <div className="flex flex-col">
            {reserva ? <StyledInput  required onChange={handleChange} name="valor_total" id="valor_total" label="Precio Reserva" value={formData.valor_total} type="number"/> : ''}
          
            </div>
            <div className="flex-flex-col">
            {response && response?.error?.noches ? <p>{response.error.noches}</p> : ''}
           <StyledInput  required onChange={handleChange} name="cantidad_noches" id="cantidad_noches" label="Cantidad Noches" value={formData.cantidad_noches} type="number"/>
           
            </div>
            <div className="flex flex-col">
            {response && response?.error?.fechaVacia ? <p>{response.error.fechaVacia}</p> : ''}
           <StyledInput  required onChange={handleChange} name="fecha_desde" id="fecha_desde" label="Fecha Desde" value={formData.fecha_desde} type="text"/>
           
            </div>
            <div className="flex flex-col">
            {response && response?.error?.inquilino ? <p>{response.error.inquilino}</p> : ''}
           <StyledSelect required  onChange={handleChange} selectedIdOption={formData.inquilino_id} options={inquilinos} entityType="inquilinos" name="inquilino_id" label="Seleccionar Inquilino" id="inquilino_id" placeholder="Seleccione un inquilino" />
          
            </div>
            <div className="flex flex-col">
            {response && response?.error?.propiedad ? <p>{response.error.propiedad}</p> : ''}
           <StyledSelect required  onChange={handleChange} selectedIdOption={formData.propiedad_id} options={propiedades} entityType="propiedades" name="propiedad_id" label="Seleccionar Propiedad" id="propiedad_id" placeholder="Seleccione una propiedad" />
        
            </div>
              </div>
          <div className="flex justify-center mt-6">
          <div>{response && response.data ? <p>{response.data.data}</p> : ''}</div>
          <SubmitButton onClick={handleSubmit} text={buttonMessage} />
          {/* {(loading==true)? <p>Por favor, espere...</p>:''} */}

          {<p>{message}</p>}
          {/* {(reserva==null)? (loading==true ? <p>Confirmando reserva...</p> : <p>Reserva Confirmada</p>) : (loading == true? <p>Actualizando reserva...</p> : <p>Reserva actualizada!</p>)}  */}
          </div>
        </form>
      </div>
    </div>
  )
}