import React, { useEffect, useState } from 'react'
import { getData } from '../../utils/requests';
import { GridDiv, EditRedirectButton, DeleteButton, AddButton, LoadingSpinner} from '../../components/organisms'
import { Link } from 'react-router-dom';

function showData({data, setLoadingReservas, propiedades, inquilinos, setLoading, refreshData}) {
  //console.log(data, propiedades, inquilinos, setLoading);

  // No sé que hacen pero funcionan (ofrecen un array donde muestran nombre en vez de id con la prop id de la reserva.)
  const propiedadMap = propiedades.reduce((acc, propiedad) => {
    acc[propiedad.id] = propiedad.domicilio;
    return acc;
  }, {});
  const inquilinoMap = inquilinos.reduce((acc, inquilino) => {
    acc[inquilino.id] = `${inquilino.apellido} ${inquilino.nombre}`;
    return acc;
  }, {});
  
  return (
    <div className="relative">
      <GridDiv>
        {data.map((reserva) => (
          <div key={reserva.id} className="max-w-sm rounded overflow-hidden shadow-lg bg-gray-200 p-6 transition-transform transform hover:scale-105">
            <h2 className="text-xl font-bold mb-2">{propiedadMap[reserva.propiedad_id]} | Por: {inquilinoMap[reserva.inquilino_id]}</h2>
            <div className="mb-4 text-sm">
              <p>Fecha: {reserva.fecha_desde}</p>
              <p>Noches Reservadas: {reserva.cantidad_noches}</p>
              <p>Precio: ${reserva.valor_total}</p>
            </div>
            <div className="flex justify-between">
              <EditRedirectButton>
                <Link to={`/reservas/editar/${reserva.id}`}> Editar </Link>
              </EditRedirectButton>
              <DeleteButton entityId={reserva.id} type="reserva" setLoading={setLoading} onDelete={refreshData}>Eliminar</DeleteButton>
            </div>
          </div>
        ))}
      </GridDiv>
    </div>
  )
}

function ReservaPage() {
  const [reservas, setReservas] = useState([])
  const [propiedades, setPropiedades] = useState([])
  const [inquilinos, setInquilinos] = useState([])
  const [loadingReservas, setLoadingReservas] = useState(true);
  const [loadingPropiedades, setLoadingPropiedades] = useState(true)
  const [loadingInquilinos, setLoadingInquilinos] = useState(true)
  const [loading, setLoading] = useState(false)
  useEffect(() => {
    getData({link:'reservas',setData: setReservas, setLoading: setLoadingReservas})
    getData({link:`propiedades`, setData: setPropiedades, setLoading: setLoadingPropiedades})
    getData({link:`inquilinos`, setData: setInquilinos, setLoading: setLoadingInquilinos})
  }, []);

  const refreshData = (deleteId) => {
    console.log(deleteId)
    // setLoadingReservas(true);
    // setLoadingPropiedades(true);
    // setLoadingInquilinos(true);
    // getData({ link: 'reservas', setData: setReservas, setLoading: setLoadingReservas });
    // getData({ link: 'propiedades', setData: setPropiedades, setLoading: setLoadingPropiedades });
    // getData({ link: 'inquilinos', setData: setInquilinos, setLoading: setLoadingInquilinos });
    setReservas(reservas => reservas.filter(reserva => reserva.id !== deleteId));
  };


  useEffect((deleteId) => {
    refreshData(deleteId);
  }, []);

  return (
    <div>
        <div className="bg-slate-200 flex gap-3 p-2">
          <p>Acciones: </p>
          <AddButton>
            <Link to='/reservas/crear'>Agregar Reserva</Link>
          </AddButton>
        </div>
        {loadingReservas && loadingPropiedades && loadingInquilinos ? <LoadingSpinner /> : showData({data: reservas, setLoadingReservas, setLoading, propiedades, inquilinos, setLoading, refreshData})}
    </div>
  )
}

export default ReservaPage;

// listado de reservas.
// boton para crear nueva reserva (renderiza una nueva pagina).
// boton de editar reserva (renderiza una nueva pagina).
// boton de eliminar reserva (se pide confirmacion).