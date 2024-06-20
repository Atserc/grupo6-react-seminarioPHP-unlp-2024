import React from 'react'
import Swal from 'sweetalert2';
import { sendData } from '../../../utils/requests';
import { useState, useEffect } from 'react';
// import { useParams } from 'react-router-dom';
import { StyledInput, StyledSelect, SubmitButton } from '../../organisms'

export default function PropiedadForm({propiedad = null, localidades, tipoPropiedades, link, method, titleMessage, buttonMessage}) {
  const [response, setResponse] = useState()
  const [message, setMessage] = useState()
  const [loading, setLoading] = useState()
  const [formData, setFormData] = useState({
    cantidad_banios: '',
    cantidad_huespedes: '',
    cantidad_habitaciones: '',
    cantidad_dias: '',
    domicilio: '',
    fecha_inicio_disponibilidad: '',
    imagen: '',
    tipo_imagen: '',
    cochera: false,
    disponible: false,
    localidad_id: '',
    tipo_propiedad_id: ''
  });

  useEffect(() => {
    console.log(propiedad)
    if (propiedad) {
      setFormData(propiedad);
    }
    formData.cochera = propiedad?.cochera === 1 ? "on":'';
    formData.disponible = propiedad?.disponible === 1 ? "on":'';
  }, [propiedad]);

  const localidadesMap = localidades.reduce((acc, localidad) => {
    acc[localidad.id] = localidad.domicilio;
    return acc;
  }, {});
  const tipoPropiedadesMap = tipoPropiedades.reduce((acc, tipoPropiedad) => {
    acc[tipoPropiedad.id] = `${tipoPropiedad.apellido} ${tipoPropiedad.nombre}`;
    return acc;
  }, {});

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "cantidad_banios" || name === "cantidad_dias" || name === "cantidad_habitaciones" || name === "cantidad_huespedes" || name === "valor_noche" || name==="tipo_propiedad_id" || name==="localidad_id") {
      setFormData({
        ...formData,
        [name]: Number(value),
       });
    } else {
      setFormData({
        ...formData,
        [name]: name === 'cochera' || name==='disponible' ? ( value === "on" ? true: false) : value,
       });
    }
    console.log(formData, 'HOLA');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Formulario enviado:', formData);
    try {
      setLoading(true);
      setMessage(propiedad ? 'Actualizando propiedad...' : 'Creando propiedad...');
      const res =  await sendData({link, method, data: formData, setLoading: setLoading, setData: setResponse})
      console.log(res)
      if (res.code != 200 && res.code != 201) {
        setMessage(propiedad ? 'No se pudo actualizar' : 'No se pudo crear');
      } else {
        // setMessage(propiedad ? 'Propiedad actualizada' : 'Propiedad creada');
          Swal.fire({
            title: '¡Listo!',
            text: propiedad ? 'Propiedad actualizada con éxito' : 'Propiedad creada con éxito',
            icon: 'success',
            confirmButtonText: 'Ok'
          }).then(() => {
            window.location.href = '/';
          });
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
          <div className="grid grid-cols-2 gap-4">
            <StyledInput onChange={handleChange} name="cantidad_banios" id="cantidad_banios" label="Cantidad de Baños:" value={formData.cantidad_banios} type="number"/>
            <StyledInput onChange={handleChange} name="cantidad_dias" id="cantidad_dias" label="Cantidad de Días:" value={formData.cantidad_dias} type="number"/>
            {response && response?.error?.dias ? <p>{response.error.dias}</p> : ''}
            <StyledInput onChange={handleChange} name="cantidad_habitaciones" id="cantidad_habitaciones" label="Cantidad de Habitaciones:" value={formData.cantidad_habitaciones} type="number"/>
            {response && response?.error?.habitaciones ? <p>{response.error.habitaciones}</p> : ''}
            <StyledInput onChange={handleChange} name="cantidad_huespedes" id="cantidad_huespedes" label="Cantidad de Huéspedes:" value={formData.cantidad_huespedes} type="number"/>
            {/* los checkbox podrían ser componentes tambien}*/}
            <label htmlFor="cochera" className="block text-sm font-medium text-gray-700">Cochera:</label>
            <input onChange={handleChange} type="checkbox" id="cochera" name="cochera" checked={formData.cochera} className="mt-2 h-5 w-5" />
            {response && response?.error?.cochera ? <p>{response.error.cochera}</p> : ''}
            <label htmlFor="disponible" className="block text-sm font-medium text-gray-700">Disponible:</label>
            <input onChange={handleChange} type="checkbox" id="disponible" name="disponible" checked={formData.disponible} className="mt-2 h-5 w-5" />
            {response && response?.error?.disponibilidad ? <p>{response.error.disponibilidad}</p> : ''}
          </div>
          <StyledInput onChange={handleChange} name="domicilio" id="domicilio" label="Domicilio:" value={formData.domicilio} type="text"/>
          <StyledInput onChange={handleChange} name="fecha_inicio_disponibilidad" id="fecha_inicio_disponibilidad" label="Fecha de Inicio de Disponibilidad:" value={formData.fecha_inicio_disponibilidad} placeholder="YYYY-MM-DD" type="text"/>
          {response && response?.error?.inicioDisponibilidad ? <p>{response.error.inicioDisponibilidad}</p> : ''}
          {/* no se q onda la imagen*/}
          <label htmlFor="imagenURL" className="block text-sm font-medium text-gray-700">Imagen:</label>
          <input onChange={handleChange} type="text" id="imagen" name="imagen" value={formData.imagen} className="block w-full px-3 py-2 border border-gray-300 rounded-md" />
          <StyledInput onChange={handleChange} name="tipo_imagen" id="tipo_imagen" label="Tipo de Imagen" value={formData.tipo_imagen} type="text"/>
          
          {/*ACOMODAR SELECTS*/}
          {/* <StyledInput name="localidad_id" id="localidad_id" label="ID de Localidad:" value={propiedad.localidad_id} type="number"/> */}
          <StyledSelect onChange={handleChange} selectedIdOption={formData.localidad_id} options={localidades} entityType="localidades" name="localidad_id" label="Seleccionar localidad" id="localidad_id" placeholder="Seleccione una localidad" />
          {response && response?.error?.localidadId ? <p>{response.error.localidadId}</p> : ''}
          
          {/* <StyledInput name="tipo_propiedad_id" id="tipo_propiedad_id" label="ID de Tipo de Propiedad:" value={propiedad.tipo_propiedad_id} type="number"/> */}
          <StyledSelect onChange={handleChange} selectedIdOption={formData.tipo_propiedad_id} options={tipoPropiedades} entityType="tipo_propiedad" name="tipo_propiedad_id" label="Seleccionar tipo de propiedad" id="tipo_propiedad_id" placeholder="Seleccione un tipo de propiedad" />
          {response && response?.error?.tipoPropiedadId ? <p>{response.error.tipoPropiedadId}</p> : ''}

          <StyledInput onChange={handleChange} name="valor_noche" id="valor_noche" label="Valor por Noche:" value={formData.valor_noche} type="number"/>
          <div className="flex justify-center mt-6">
            <SubmitButton onClick={handleSubmit} text={buttonMessage}/>
          </div>
          {<p className="text-red-500">{message}</p>}
          {/* {response?.error ? <p className="text-red-500">Verificá que el formulario sea válido</p>: ''} */}
        </form>
      </div>
    </div>
  )
}

// function EditPropiedad() {
//   const [propiedad, setPropiedad] = useState([]);
//   const [tipoPropiedades, setTipoPropiedades] = useState([]);
//   const [localidades, setLocalidades] = useState([]);
//   const [loadingPropiedad, setLoadingPropiedad] = useState(true);
//   const [loadingLocalidades, setLoadingLocalidades] = useState(true);
//   const [loadingTipoPropiedades, setLoadingTipoPropiedades] = useState(true);
//   const {id} = useParams();

//   useEffect(() => {
//     getData({link:`propiedades/${id}`,setData: setPropiedad, setLoading: setLoadingPropiedad})
//     getData({link:'localidades',setData: setLocalidades, setLoading: setLoadingLocalidades})
//     getData({link:'tipos_propiedad',setData: setTipoPropiedades, setLoading: setLoadingTipoPropiedades})
//   }, [id]);
  
//   return (
//     <div>
//         {loadingPropiedad && loadingLocalidades && loadingTipoPropiedades ? <p>Cargando...</p> : ShowData(propiedad, localidades, tipoPropiedades)}
//     </div>
//   )
// }

// export default EditPropiedad;

// formulario precargado y mostrar mensaje del backend.