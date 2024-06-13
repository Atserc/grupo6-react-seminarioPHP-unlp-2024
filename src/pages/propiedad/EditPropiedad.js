import React from 'react'
import { getData } from '../../utils/requests';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { LoadingSpinner, StyledInput, StyledSelect } from '../../components/organisms'

function showData(preData, localidades, tipoPropiedades) {
  console.log(preData);
  console.log(localidades);
  console.log(tipoPropiedades);
  return (
    <div className="flex justify-center items-center min-h-screen py-5">
      <div className="w-full max-w-2xl p-8 bg-gray-200 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold mb-6 text-center">Editar Propiedad</h1>
        <form className="grid grid-cols-1 gap-6">
          <div className="grid grid-cols-2 gap-4">
            <StyledInput name="cantidad_banios" id="cantidad_banios" label="Cantidad de Baños:" value={preData.cantidad_banios} required type="number"/>
            <StyledInput name="cantidad_dias" id="cantidad_dias" label="Cantidad de Días:" value={preData.cantidad_dias} required type="number"/>
            <StyledInput name="cantidad_habitaciones" id="cantidad_habitaciones" label="Cantidad de Habitaciones:" value={preData.cantidad_habitaciones} required type="number"/>
            <StyledInput name="cantidad_huespedes" id="cantidad_huespedes" label="Cantidad de Huéspedes:" value={preData.cantidad_huespedes} required type="number"/>
            {/* los checkbox podrían ser componentes tambien}*/}
            <label htmlFor="cochera" className="block text-sm font-medium text-gray-700">Cochera:</label>
            <input type="checkbox" id="cochera" name="cochera" defaultChecked={preData.cochera === 1} className="mt-2 h-5 w-5" />
            <label htmlFor="disponible" className="block text-sm font-medium text-gray-700">Disponible:</label>
            <input type="checkbox" id="disponible" name="disponible" defaultChecked={preData.disponible === 1} className="mt-2 h-5 w-5" />
          </div>
          <StyledInput name="domicilio" id="domicilio" label="Domicilio:" value={preData.domicilio} required type="text"/>
          <StyledInput name="fecha_inicio_disponibilidad" id="fecha_inicio_disponibilidad" label="Fecha de Inicio de Disponibilidad:" value={preData.fecha_inicio_disponibilidad} required type="number"/>
          {/* no se q onda la imagen*/}
          <label htmlFor="imagenURL" className="block text-sm font-medium text-gray-700">Imagen:</label>
          <input type="text" id="imagenURL" name="imagenURL" value={preData.imagen} required className="block w-full px-3 py-2 border border-gray-300 rounded-md" />
          <StyledInput name="tipo_imagen" id="tipo_imagen" label="Tipo de Imagen" value={preData.tipo_imagen} required type="text"/>
          
          <StyledInput name="localidad_id" id="localidad_id" label="ID de Localidad:" value={preData.localidad_id} required type="number"/>
          <StyledSelect required selectedIdOption={preData.localidad_id} options={localidades} entityType="localidades" name="localidad_id" label="Seleccionar localidad" id="localidad_id" placeholder="Seleccione una localidad" />
          
          <StyledInput name="tipo_propiedad_id" id="tipo_propiedad_id" label="ID de Tipo de Propiedad:" value={preData.tipo_propiedad_id} required type="number"/>
          <StyledSelect required selectedIdOption={preData.tipo_propiedad_id} options={tipoPropiedades} entityType="tipo_propiedad" name="tipo_propiedad_id" label="Seleccionar tipo de propiedad" id="tipo_propiedad_id" placeholder="Seleccione un tipo de propiedad" />

          <StyledInput name="valor_noche" id="valor_noche" label="Valor por Noche:" value={preData.valor_noche} required type="number"/>
          <div className="flex justify-center mt-6">
            <input type="submit" value="Enviar" className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700 transition duration-300" />
          </div>
        </form>
      </div>
    </div>
  )
}

function EditPropiedad() {
  const [propiedad, setPropiedad] = useState([]);
  const [tipoPropiedades, setTipoPropiedades] = useState([]);
  const [localidades, setLocalidades] = useState([]);
  const [loadingPropiedad, setLoadingPropiedad] = useState(true);
  const [loadingLocalidades, setLoadingLocalidades] = useState(true);
  const [loadingTipoPropiedades, setLoadingTipoPropiedades] = useState(true);
  const {id} = useParams();

  useEffect(() => {
    getData({link:`propiedades/${id}`,setData: setPropiedad, setLoading: setLoadingPropiedad})
    getData({link:'localidades',setData: setLocalidades, setLoading: setLoadingLocalidades})
    getData({link:'tipos_propiedad',setData: setTipoPropiedades, setLoading: setLoadingTipoPropiedades})
  }, [id]);
  
  return (
    <div>
        {loadingPropiedad && loadingLocalidades && loadingTipoPropiedades ? <LoadingSpinner /> : showData(propiedad, localidades, tipoPropiedades)}
    </div>
  )
}

export default EditPropiedad;
// formulario precargado y mostrar mensaje del backend.