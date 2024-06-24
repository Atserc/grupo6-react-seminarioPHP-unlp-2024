import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import { validarFormulario } from '../../../utils';
import { sendData } from '../../../utils/requests';
import {StyledInput, StyledSelect, SubmitButton } from '../../organisms'

export default function PropiedadForm({propiedad = null, localidades, tipoPropiedades, link, method, titleMessage, buttonMessage}) {
  const [response, setResponse] = useState()
  const [message, setMessage] = useState()
  const [loading, setLoading] = useState()
  const [formData, setFormData] = useState({
    cantidad_banios: 0,
    cantidad_huespedes: "",
    cantidad_habitaciones: "",
    cantidad_dias: "",
    domicilio: "",
    fecha_inicio_disponibilidad: "",
    imagen: "",
    tipo_imagen: "",
    cochera: 0,
    disponible: 0,
    localidad_id: "",
    tipo_propiedad_id: ""
  });

  useEffect(() => {
    if (propiedad) {
      setFormData(propiedad);
    }
    //formData.cochera = propiedad? propiedad.cochera:0;
    //formData.disponible = propiedad? propiedad.disponible:0;
  }, [propiedad]);

/*  const localidadesMap = localidades.reduce((acc, localidad) => {
    acc[localidad.id] = localidad.domicilio;
    return acc;
  }, {});
  const tipoPropiedadesMap = tipoPropiedades.reduce((acc, tipoPropiedad) => {
    acc[tipoPropiedad.id] = `${tipoPropiedad.apellido} ${tipoPropiedad.nombre}`;
    return acc;
  }, {});
*/
  const handleChange = (e) => {
    console.log(formData)
    const { name, value, checked } = e.target;
    if (name === "cantidad_banios" || name === "cantidad_dias" || name === "cantidad_habitaciones" || name === "cantidad_huespedes" || name === "valor_noche" || name==="tipo_propiedad_id" || name==="localidad_id") {
      setFormData({
        ...formData,
        [name]: Number(value),
       });
    } else {
      setFormData({
        ...formData,
        [name]: name === 'cochera' || name==='disponible' ? ( checked ? 1: 0) : value,
       });
    }
    console.log(formData, 'HOLA');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    //console.log('Formulario enviado:', formData);
    if (validarFormulario(formData, 'propiedad')) {
      try {
        setLoading(true);
        setMessage(propiedad ? 'Actualizando propiedad...' : 'Creando propiedad...');
        const res =  await sendData({link, method, data: formData, setLoading: setLoading, setData: setResponse})
        console.log(res)
        if (res.code !== 200 && res.code !== 201) {
          setMessage(propiedad ? 'No se pudo actualizar' : 'Verificá que el formulario sea válido');
          setLoading(false);
        } else {
            setLoading(false);
            Swal.fire({
              title: '¡Listo!',
              text: res.data,
              icon: 'success',
              confirmButtonText: 'Ok'
            }).then(() => {
              window.location.href = '/';
            });
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
        <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-6">
          <div className="grid grid-cols-2 gap-4">
            {response && response?.error?.baños ? <p>{response.error.baños}</p> : ''}
            <StyledInput onChange={handleChange} name="cantidad_banios" id="cantidad_banios" label="Cantidad de Baños:" value={formData.cantidad_banios ?? ""} type="number"/>
            <StyledInput required onChange={handleChange} name="cantidad_dias" id="cantidad_dias" label="Cantidad de Días:" value={formData.cantidad_dias ?? ""} type="number"/>
            {response && response?.error?.dias ? <p>{response.error.dias}</p> : ''}
            <StyledInput onChange={handleChange} name="cantidad_habitaciones" id="cantidad_habitaciones" label="Cantidad de Habitaciones:" value={formData.cantidad_habitaciones ?? ""} type="number"/>
            {response && response?.error?.habitaciones ? <p>{response.error.habitaciones}</p> : ''}
            <StyledInput required onChange={handleChange} name="cantidad_huespedes" id="cantidad_huespedes" label="Cantidad de Huéspedes:" value={formData.cantidad_huespedes ?? ""} type="number"/>
            {/* los checkbox podrían ser componentes tambien}*/}
            <label htmlFor="cochera" className="block text-sm font-medium text-gray-700">Cochera:</label>
            <input onChange={handleChange} type="checkbox" id="cochera" name="cochera" checked={formData.cochera === 1} className="mt-2 h-5 w-5" />
            {response && response?.error?.cochera ? <p>{response.error.cochera}</p> : ''}
            <label htmlFor="disponible" className="block text-sm font-medium text-gray-700">Disponible:</label>
            <input onChange={handleChange} type="checkbox" id="disponible" name="disponible" checked={formData.disponible === 1} className="mt-2 h-5 w-5" />
            {response && response?.error?.disponibilidad ? <p>{response.error.disponibilidad}</p> : ''}
          </div>
          <StyledInput required onChange={handleChange} name="domicilio" id="domicilio" label="Domicilio:" value={formData.domicilio} type="text"/>
          <StyledInput required onChange={handleChange} name="fecha_inicio_disponibilidad" id="fecha_inicio_disponibilidad" label="Fecha de Inicio de Disponibilidad:" value={formData.fecha_inicio_disponibilidad ?? ""} type="date"/>
          {response && response?.error?.inicioDisponibilidad ? <p>{response.error.inicioDisponibilidad}</p> : ''}

          <input
            id= 'imagen'
            type="file"
            onChange={(e) => {
                const file = e.target.files[0];
                const reader = new FileReader();
                reader.onloadend = () => {
                    const imageDataUrl = reader.result;
                    setFormData({
                      ...formData,
                      imagen: imageDataUrl,
                     });
                };
                reader.readAsDataURL(file);
            }}
          />

          {/*<StyledInput onChange={handleChange} name="imagen" id="imagen" label="Imagen: " value={formData.imagen ?? ""} type="text"/>
          <StyledInput onChange={handleChange} name="tipo_imagen" id="tipo_imagen" label="Tipo de Imagen: " value={formData.tipo_imagen ?? ""} type="text"/>*/}
          
          {/*ACOMODAR SELECTS*/}
          {/* <StyledInput name="localidad_id" id="localidad_id" label="ID de Localidad:" value={propiedad.localidad_id} type="number"/> */}
          <StyledSelect required onChange={handleChange} selectedIdOption={formData.localidad_id} options={localidades} entityType="localidades" name="localidad_id" label="Seleccionar localidad" id="localidad_id" placeholder="Seleccione una localidad" />
          {response && response?.error?.localidadId ? <p>{response.error.localidadId}</p> : ''}
          
          {/* <StyledInput name="tipo_propiedad_id" id="tipo_propiedad_id" label="ID de Tipo de Propiedad:" value={propiedad.tipo_propiedad_id} type="number"/> */}
          <StyledSelect required onChange={handleChange} selectedIdOption={formData.tipo_propiedad_id} options={tipoPropiedades} entityType="tipo_propiedad" name="tipo_propiedad_id" label="Seleccionar tipo de propiedad" id="tipo_propiedad_id" placeholder="Seleccione un tipo de propiedad" />
          {response && response?.error?.tipoPropiedadId ? <p>{response.error.tipoPropiedadId}</p> : ''}

          <StyledInput required onChange={handleChange} name="valor_noche" id="valor_noche" label="Valor por Noche:" value={formData.valor_noche ?? ""} type="number"/>
          <div className="flex justify-center mt-6">
            {/* <SubmitButton onClick={handleSubmit} text={buttonMessage}/> */}
            <SubmitButton text={buttonMessage}/>
          </div>
          <div>
            {loading ? 
                <p className={message === "Actualizando propiedad..." || 'Creando propiedad...' ? 'text-green-500' : 'text-red-500'}>{message}</p>
            : <></>}
          </div>
          {/* {response?.error ? <p className="text-red-500">Verificá que el formulario sea válido</p>: ''} */}
        </form>
      </div>
    </div>
  )
}