import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getData } from '../../utils/requests';
import { LoadingSpinner } from '../../components/organisms';

function showData(propiedad, localidad, tipoPropiedad) {
  return (
    <div key={propiedad.id} className="min-h-screen bg-gray-400 p-10">
      <div className="bg-slate-200 flex justify-center items-center p-10 rounded-xl">
        <div className="w-1/2 flex flex-col justify-center items-center p-5">
          <div>
          <img src={propiedad.imagen + propiedad.tipo_imagen} alt="sin foto" className="w-full max-h-48 object-cover mb-6" />
          </div>
          <div>
          <h2 className="text-4xl font-bold mb-4">{propiedad.domicilio}</h2>
          </div>
        </div>
        <div className="w-1/2 mb-8 text-base">
          <p className="text-lg">
            <span className="font-bold">Disponible: </span>
            <span className={`font-bold ${propiedad.disponible === 1 ? "text-green-500" : "text-red-500"}`}>
              {propiedad.disponible === 1 ? "Sí" : "No"}
            </span>
          </p>
          <p className="text-lg">Cantidad de habitaciones: {propiedad.cantidad_habitaciones}</p>
          <p className="text-lg">Cantidad de huespedes: {propiedad.cantidad_huespedes}</p>
          <p className="text-lg">Cantidad de baños: {propiedad.cantidad_banios}</p>
          <p className="text-lg">Con cochera: {propiedad.cochera === 1 ? "Sí" : "No"}</p>
          <p className="text-lg">Desde: {propiedad.disponible === 1 ? propiedad.fecha_inicio_disponibilidad : "Ya está ocupada."}</p>
          <p className="text-lg">Cantidad de días disponible: {propiedad.cantidad_dias}</p>
          <p className="text-lg">Localidad: {localidad ? localidad.nombre : "Desconocida"}</p>
          <p className="text-lg">Tipo propiedad: {tipoPropiedad ? tipoPropiedad.nombre : "Desconocido"}</p>
          <p className="font-bold text-xl">Valor por noche: ${propiedad.valor_noche}</p>
        </div>
      </div>
    </div>
  );
}


function DetailPropiedad() {
  const [propiedad, setPropiedad] = useState(null);
  const [localidad, setLocalidad] = useState({});
  const [tipoPropiedad, setTipoPropiedad] = useState({});
  const [loadingP, setLoadingP] = useState(true);
  const [loadingL, setLoadingL] = useState(true);
  const [loadingTP, setLoadingTP] = useState(true);
  const { id } = useParams();

  useEffect(() => {
    getData({link:`propiedades/${id}`,setData: setPropiedad,setLoading: setLoadingP})
    }, [id]);

  useEffect(() => {
    if (propiedad !== null) {
      getData({link: `localidades/${propiedad.localidad_id}`,setData: setLocalidad, setLoading: setLoadingL})
      getData({link: `tipos_propiedad/${propiedad.tipo_propiedad_id}`,setData: setTipoPropiedad, setLoading: setLoadingTP})
    }
  }, [propiedad]);

  return (
    <div>
      {loadingL || loadingTP || loadingP  ? <LoadingSpinner /> : showData(propiedad, localidad, tipoPropiedad)}
    </div>
  );
}

export default DetailPropiedad;
