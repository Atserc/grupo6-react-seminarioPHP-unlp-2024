import React, { useEffect, useState } from 'react'

function getData(link,setData,setLoading) {
  fetch(link)
    .then(response => response.json())
    .then((payload) => {
      setData(payload["data"])
    })
    .catch(error => console.log(error))
    .finally(() => setLoading(false));
}

function showData(data) {
  console.log(data);
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
      {data.map((propiedad) => (
        <div key={propiedad.id} className="max-w-sm rounded overflow-hidden shadow-lg bg-white p-6 transition-transform transform hover:scale-105">
          <h2 className="text-xl font-bold mb-2">{propiedad.domicilio}</h2>
          <img src={propiedad.imagen + propiedad.tipo_imagen} alt="sin foto" className="w-full h-48 object-cover mb-4" />
          <div className="mb-4">
            <p>Cantidad de habitaciones: {propiedad.cantidad_habitaciones}</p>
            <p>Cantidad de huespedes: {propiedad.cantidad_huespedes}</p>
            <p>Cantidad de baños: {propiedad.cantidad_banios}</p>
            <p>Con cochera: {propiedad.cochera === 1 ? "Sí" : "No"}</p>
            <p>Disponible: {propiedad.disponible === 1 ? "Sí" : "No"}</p>
            <p>Desde: {propiedad.disponible === 1 ? propiedad.fecha_inicio_disponibilidad : "-"}</p>
            <p>Cantidad de días disponible: {propiedad.cantidad_dias}</p>
            <p>Valor por noche: ${propiedad.valor_noche}</p>
            <p>Tipo propiedad: {propiedad.tipo_propiedad_id}</p>
          </div>
          <div className="flex justify-between">
            <button className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700 transition duration-300">Editar</button>
            <button className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-700 transition duration-300">Eliminar</button>
          </div>
        </div>
      ))}
</div>
  )
}

function PropiedadPage() {

  const [propiedades, setPropiedades] = useState([])
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    getData('http://localhost/propiedades',setPropiedades, setLoading)
  }, []);

  return (
    <div>
        {loading ? <p>Cargando...</p> : showData(propiedades)}
    </div>
  )
}

export default PropiedadPage;

// listado, filtros.
// boton para crear propiedad (renderiza una nueva pagina).
// boton de eliminar propiedad (se pide confirmacion).