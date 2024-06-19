import React, {useEffect, useState} from 'react'
import { useParams } from 'react-router-dom';
import { getData } from '../../utils/requests';
import { LoadingSpinner } from '../../components/organisms'

function showData(propiedad){
  return (
    <div>
      <h1>{propiedad.nombre}</h1>
      <p>{propiedad.descripcion}</p>
      <p>{propiedad.cantidad_huespedes}</p>
      <p>{propiedad.direccion}</p>
      <p>{propiedad.localidad_id}</p>
      <p>{propiedad.tipo_propiedad_id}</p>
      <p>{propiedad.disponible}</p>
      <p>{propiedad.fecha_inicio_disponibilidad}</p>
      <p>{propiedad.fecha_fin_disponibilidad}</p>
      <p>{propiedad.precio_noche}</p>
      <p>{propiedad.imagen}</p>
    </div>
  )
}

function DetailPropiedad() {
  const [propiedad, setPropiedad] = useState([])
  const [loading, setLoading] = useState(true);
  const {id} = useParams();

  useEffect(() => {
    getData({link:`propiedades/${id}`, setData: setPropiedad, setLoading: setLoading})
  }, [id]);

  return (
    <div>
        {loading ? <LoadingSpinner /> : showData(propiedad)}
    </div>
  )
}

export default DetailPropiedad;

// detalles de propiedad.