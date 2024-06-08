import React, { useEffect, useState } from 'react'
import {getData} from '../../utils/index.js';
import { GridDiv, EditRedirectButton, DeleteButton } from '../../components/organisms/index.js'

function showData(data) {
  console.log(data);
  return (
    <GridDiv>
      {data.map((reserva) => (
        <div className="max-w-sm rounded overflow-hidden shadow-lg bg-white p-6 transition-transform transform hover:scale-105">
          <h2 className="text-xl font-bold mb-2">{reserva.propiedad_id} | Por: {reserva.inquilino_id}</h2>
          <div className="mb-4 text-sm">
            <p>Fecha: {reserva.fecha_desde}</p>
            <p>Noches Reservadas: {reserva.cantidad_noches}</p>
            <p>Precio: ${reserva.valor_total}</p>
          </div>
          <div className="flex justify-between">
            <EditRedirectButton href={`/editar-reserva/${reserva.id}`}>Editar</EditRedirectButton>
            <DeleteButton entityId={reserva.id} type="reservas">Eliminar</DeleteButton>
          </div>
        </div>
      ))}
    </GridDiv>
  )
}

function ReservaPage() {
  const [reservas, setReservas] = useState([])
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    getData({link:'reservas',setData: setReservas, setLoading: setLoading})
  }, []);

  return (
    <div>
        {loading ? <p>Cargando...</p> : showData(reservas)}
    </div>
  )
}

export default ReservaPage;

// listado de reservas.
// boton para crear nueva reserva (renderiza una nueva pagina).
// boton de editar reserva (renderiza una nueva pagina).
// boton de eliminar reserva (se pide confirmacion).