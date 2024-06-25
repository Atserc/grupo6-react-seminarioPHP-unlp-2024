import React, { useEffect, useState } from 'react'
import { getData } from '../../utils/requests';
import { GridDiv, EditRedirectButton, DeleteButton, LoadingSpinner, Actions} from '../../components/organisms'
import { Link } from 'react-router-dom';

function showData({data, propiedades, inquilinos, setLoadingReservas, refreshData}) {

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
              <Link to={`/reservas/editar/${reserva.id}`}> 
                <EditRedirectButton>
                Editar
                </EditRedirectButton>
              </Link>
              <DeleteButton entityId={reserva.id} type="reservas" setLoading={setLoadingReservas} message="Reserva eliminada correctamente." onDelete={refreshData}>Eliminar</DeleteButton>
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
  
  useEffect(() => {
    getData({link:'reservas',setData: setReservas, setLoading: setLoadingReservas})
    getData({link:`propiedades`, setData: setPropiedades, setLoading: setLoadingPropiedades})
    getData({link:`inquilinos`, setData: setInquilinos, setLoading: setLoadingInquilinos})
  }, []);

  const refreshData = (deleteId) => {
    setReservas(reservas => reservas.filter(reserva => reserva.id !== deleteId));
  };

  return (
    <div>
        <Actions link="reservas" label="Agregar Reserva" />
        {loadingReservas || loadingPropiedades || loadingInquilinos ? <LoadingSpinner /> : showData({data: reservas, propiedades, inquilinos, setLoadingReservas, refreshData})}
    </div>
  )
}

export default ReservaPage;