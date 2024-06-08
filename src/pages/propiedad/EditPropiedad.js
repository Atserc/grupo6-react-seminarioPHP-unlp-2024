import React from 'react'
import { getData } from '../../utils/requests';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

function showData(preData) {
  console.log(preData);
  return (
    <div className="flex justify-center items-center min-h-screen py-5">
      <div className="w-full max-w-2xl p-8 bg-gray-200 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold mb-6 text-center">Editar Propiedad</h1>
        <form className="grid grid-cols-1 gap-6">
          <div className="grid grid-cols-2 gap-4">
            <label htmlFor="cantidad_banios" className="block text-sm font-medium text-gray-700">Cantidad de Baños:</label>
            <input type="number" id="cantidad_banios" name="cantidad_banios" value={preData.cantidad_banios} required className="block w-full px-3 py-2 border border-gray-300 rounded-md" />

            <label htmlFor="cantidad_dias" className="block text-sm font-medium text-gray-700">Cantidad de Días:</label>
            <input type="number" id="cantidad_dias" name="cantidad_dias" value={preData.cantidad_dias} required className="block w-full px-3 py-2 border border-gray-300 rounded-md" />

            <label htmlFor="cantidad_habitaciones" className="block text-sm font-medium text-gray-700">Cantidad de Habitaciones:</label>
            <input type="number" id="cantidad_habitaciones" name="cantidad_habitaciones" value={preData.cantidad_habitaciones} required className="block w-full px-3 py-2 border border-gray-300 rounded-md" />

            <label htmlFor="cantidad_huespedes" className="block text-sm font-medium text-gray-700">Cantidad de Huéspedes:</label>
            <input type="number" id="cantidad_huespedes" name="cantidad_huespedes" value={preData.cantidad_huespedes} required className="block w-full px-3 py-2 border border-gray-300 rounded-md" />

            <label htmlFor="cochera" className="block text-sm font-medium text-gray-700">Cochera:</label>
            <input type="checkbox" id="cochera" name="cochera" defaultChecked={preData.cochera === 1} className="mt-2 h-5 w-5" />

            <label htmlFor="disponible" className="block text-sm font-medium text-gray-700">Disponible:</label>
            <input type="checkbox" id="disponible" name="disponible" defaultChecked={preData.disponible === 1} className="mt-2 h-5 w-5" />
          </div>

          <label htmlFor="domicilio" className="block text-sm font-medium text-gray-700">Domicilio:</label>
          <input type="text" id="domicilio" name="domicilio" value={preData.domicilio} required className="block w-full px-3 py-2 border border-gray-300 rounded-md" />

          <label htmlFor="fecha_inicio_disponibilidad" className="block text-sm font-medium text-gray-700">Fecha de Inicio de Disponibilidad:</label>
          <input type="date" id="fecha_inicio_disponibilidad" name="fecha_inicio_disponibilidad" required className="block w-full px-3 py-2 border border-gray-300 rounded-md" />
          
          <label htmlFor="imagenURL" className="block text-sm font-medium text-gray-700">Imagen:</label>
          <input type="text" id="imagenURL" name="imagenURL" value={preData.imagen} required className="block w-full px-3 py-2 border border-gray-300 rounded-md" />

          <label htmlFor="tipo_imagen" className="block text-sm font-medium text-gray-700">Tipo de Imagen:</label>
          <input type="text" id="tipo_imagen" name="tipo_imagen" value={preData.tipo_imagen} required className="block w-full px-3 py-2 border border-gray-300 rounded-md" />

          <label htmlFor="localidad_id" className="block text-sm font-medium text-gray-700">Localidad ID:</label>
          <input type="number" id="localidad_id" name="localidad_id" value={preData.localidad_id} required className="block w-full px-3 py-2 border border-gray-300 rounded-md" />

          <label htmlFor="tipo_propiedad_id" className="block text-sm font-medium text-gray-700">Tipo de Propiedad ID:</label>
          <input type="number" id="tipo_propiedad_id" name="tipo_propiedad_id" value={preData.tipo_propiedad_id} required className="block w-full px-3 py-2 border border-gray-300 rounded-md" />

          <label htmlFor="valor_noche" className="block text-sm font-medium text-gray-700">Valor por Noche:</label>
          <input type="number" id="valor_noche" name="valor_noche" value={preData.valor_noche} required className="block w-full px-3 py-2 border border-gray-300 rounded-md" />

          <div className="flex justify-center mt-6">
            <input type="submit" value="Enviar" className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700 transition duration-300" />
          </div>
        </form>
      </div>
    </div>
  )
}

function EditPropiedad() {
  const [propiedad, setPropiedad] = useState([])
  const [loading, setLoading] = useState(true);
  const {id} = useParams();

  useEffect(() => {
    getData({link:`propiedades/${id}`,setData: setPropiedad, setLoading: setLoading})
  }, [id]);

  return (
    <div>
        {loading ? <p>Cargando...</p> : showData(propiedad)}
    </div>
  )
}

export default EditPropiedad;

// formulario precargado y mostrar mensaje del backend.