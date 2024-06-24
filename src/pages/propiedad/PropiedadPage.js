import React, { useEffect, useState } from 'react'
import { getData } from '../../utils/requests';
import { validateEmpty } from '../../utils/';
import { GridDiv, EditRedirectButton, DeleteButton, LoadingSpinner, FilterForm, Actions } from '../../components/organisms'
import { Link } from 'react-router-dom';

function applyFilter(setLoadingPropiedades, setPropiedades, filtros,message,setMessage) {
  let newLink = 'propiedades';
  const params = [];

  if (validateEmpty(filtros.cantidad_huespedes)) {
    params.push(`cantidad_huespedes=${filtros.cantidad_huespedes}`);
  }
  if (validateEmpty(filtros.fecha_inicio_disponibilidad)) {
    params.push(`fecha_inicio_disponibilidad=${filtros.fecha_inicio_disponibilidad}`);
  }
  if (validateEmpty(filtros.disponible)) {
    switch (filtros.disponible) {
      case "Disponible":
        params.push(`disponible=1`);
        break;
      case "No disponible":
        params.push(`disponible=0`);
        break;
      default:
        break;
   }
  }
  if (validateEmpty(filtros.localidad_id)) {
    params.push(`localidad_id=${filtros.localidad_id}`);
  }
  if (params.length > 0) {
    newLink += `?${params.join('&')}`;
  }

  getData({link:newLink ,setData: setPropiedades, setLoading: setLoadingPropiedades});
}

function showData(data, localidades, tipoPropiedades, setLoading, refreshData) {
  return (
    <div className="relative">
      <GridDiv>
        {Array.isArray(data) ? (data.map((propiedad) => {
          const tipoPropiedad = tipoPropiedades.find(tipo => tipo.id === propiedad.tipo_propiedad_id);
          const localidad = localidades.find(loc => loc.id === propiedad.localidad_id);
          return (
            <div key={propiedad.id} className="max-w-sm rounded overflow-hidden shadow-lg bg-gray-200 p-6 transition-transform transform hover:scale-105">
              <h2 className="text-xl font-bold mb-2">{propiedad.domicilio}</h2>
              <div className="mb-4 text-sm">
              <p>Cantidad de huespedes: {propiedad.cantidad_huespedes}</p>
              <p>Desde: {propiedad.disponible === 1 ? propiedad.fecha_inicio_disponibilidad : `Ya está ocupada. (${propiedad.fecha_inicio_disponibilidad})`}</p>
              <p>Valor por noche: ${propiedad.valor_noche}</p>
              <p>Localidad: {localidad ? localidad.nombre : "Desconocida"}</p>
              <p>Tipo propiedad: {tipoPropiedad ? tipoPropiedad.nombre : "Desconocido"}</p>
            </div>
            <div className="flex items-center justify-between">
              <Link to={`/propiedades/detalles/${propiedad.id}`} className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700 transition duration-300">
                Detalles
              </Link>
              <div className="flex gap-2">
                <EditRedirectButton>
                  <Link to={`/propiedades/editar/${propiedad.id}`}>Editar</Link>
                </EditRedirectButton>
                <DeleteButton message="Propiedad eliminada correctamente." entityId={propiedad.id} type="propiedades" setLoading={setLoading} onDelete={refreshData}>
                  Eliminar
                </DeleteButton>
              </div>
            </div>
          </div>
        )})):(<p>{data}</p>)}
      </GridDiv>
    </div>
  )
}

function PropiedadPage() {
  const [propiedades, setPropiedades] = useState([])
  const [tipoPropiedades, setTipoPropiedades] = useState([]);
  const [localidades, setLocalidades] = useState([]);
  const [loadingDelete, setLoadingDelete] = useState(false);
  const [loadingPropiedades, setLoadingPropiedades] = useState(true);
  const [loadingLocalidades, setLoadingLocalidades] = useState(true);
  const [loadingTipoPropiedades, setLoadingTipoPropiedades] = useState(true);
  const [filtros,setFiltros] = useState("");

  useEffect(() => {
      getData({link:'propiedades',setData: setPropiedades, setLoading: setLoadingPropiedades})
      getData({link:'localidades',setData: setLocalidades, setLoading: setLoadingLocalidades})
      getData({link:'tipos_propiedad',setData: setTipoPropiedades, setLoading: setLoadingTipoPropiedades})
      }, []);

  useEffect(() => {
    applyFilter(setLoadingPropiedades,setPropiedades,filtros);
  }, [filtros]);

  const refreshData = (deleteId) => {
    setPropiedades(propiedades => propiedades.filter(propiedad => propiedad.id !== deleteId));
  };

  return (
    <div>
      <Actions link='propiedades' label='Agregar Propiedad' />
      <FilterForm localidades={localidades} setFiltros={setFiltros} />
      {loadingPropiedades || loadingLocalidades || loadingTipoPropiedades || loadingDelete ? <LoadingSpinner /> : showData(propiedades, localidades, tipoPropiedades, setLoadingDelete, refreshData)}
    </div>
  )
}

export default PropiedadPage;