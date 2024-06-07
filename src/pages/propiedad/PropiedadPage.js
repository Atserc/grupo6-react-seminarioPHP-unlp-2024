import React, { useEffect, useState } from 'react'
import {getData} from '../../utils/index.js';
import { GridDiv, EditRedirectButton, DeleteButton } from '../../components/organisms/index.js'

// Boton de edit es <a> acá, porque redirecciona o otra web, en cambio el delete siempre es <button>
// No se si es seguro poner como key la propiedad id, creo que existe alguna funcion de tipo idx automatica en js que le asigna correctamente una key
// basada en el loop en el que está.
// Por alguna razón el useEffect se triggerea varias veces al renderizar, averiguar
// Verificar urls que se envia en el edit y realizar los templates necesarios.
// En Reservas me parece que hay que hacer doble fetching, uno es getReserva, y otro getPropiedad Id, para que en el vistado de reserva se vea la propiedad
// con su nombre y datos, y no sólo el ID que no indica nada.

function showData(data) {
  // console.log(data);
  return (
    <GridDiv>
      {data.map((propiedad) => (
        <div key={propiedad.id} className="max-w-sm rounded overflow-hidden shadow-lg bg-white p-6 transition-transform transform hover:scale-105">
          <h2 className="text-xl font-bold mb-2">{propiedad.domicilio}</h2>
          <img src={propiedad.imagen + propiedad.tipo_imagen} alt="sin foto" className="w-full max-h-48 object-cover mb-4" />
          <div className="mb-4 text-sm">
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
          <div className="flex items-center justify-between">
            <EditRedirectButton href={`/editPropiedad/${propiedad.id}`}>Editar</EditRedirectButton>
            <DeleteButton entityId={propiedad.id} type="propiedad">Eliminar</DeleteButton>
          </div>
        </div>
      ))}
    </GridDiv>
  )
}

function PropiedadPage() {
  const [propiedades, setPropiedades] = useState([])
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    getData({link:'propiedades',setData: setPropiedades, setLoading: setLoading})
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