import React, { useEffect, useState } from 'react'
import { getData } from '../../utils/requests';
import { GridDiv, EditRedirectButton, DeleteButton, AddButton, LoadingSpinner, FilterForm } from '../../components/organisms'
import { Link } from 'react-router-dom';

function applyFilter(setLoadingPropiedades,setPropiedades,queryParams){
  /*setLoadingPropiedades(false);
  const newLink = 'propiedades'+queryParams;
  getData({link:newLink ,setData: setPropiedades, setLoading: setLoadingPropiedades});
  setLoadingPropiedades(true);*/
  console.log(queryParams);
}

function showData(data, localidades, tipoPropiedades, setLoading, refreshData, setQueryParams) {
  return (
    <div className="relative">
      <FilterForm propiedad={data} localidades={localidades} setQueryparams={setQueryParams} />
      <GridDiv>
        {data.map((propiedad) => {
          const tipoPropiedad = tipoPropiedades.find(tipo => tipo.id === propiedad.tipo_propiedad_id);
          const localidad = localidades.find(loc => loc.id === propiedad.localidad_id);
          return(
          <div key={propiedad.id} className="max-w-sm rounded overflow-hidden shadow-lg bg-gray-200 p-6 transition-transform transform hover:scale-105">
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
              <p>Localidad: {localidad ? localidad.nombre : "Desconocida"}</p>
              <p>Tipo propiedad: {tipoPropiedad ? tipoPropiedad.nombre : "Desconocido"}</p>
            </div>
            <div className="flex items-center justify-between">
              <EditRedirectButton>
                <Link to={`/propiedades/editar/${propiedad.id}`}> Editar </Link>
              </EditRedirectButton>              
              <DeleteButton entityId={propiedad.id} type="propiedades" setLoading={setLoading} onDelete={refreshData}>Eliminar</DeleteButton>
            </div>
          </div>
        )})}
      </GridDiv>
      <AddButton>
        <Link to='/propiedades/crear'> Agregar </Link>
      </AddButton>
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
  const [queryParams,setQueryParams] = useState("");

  useEffect(() => {
    getData({link:'propiedades',setData: setPropiedades, setLoading: setLoadingPropiedades})
    getData({link:'localidades',setData: setLocalidades, setLoading: setLoadingLocalidades})
    getData({link:'tipos_propiedad',setData: setTipoPropiedades, setLoading: setLoadingTipoPropiedades})
  }, []);

  useEffect(() => {
    applyFilter(setLoadingPropiedades,setPropiedades,queryParams);
  }, [queryParams]);

  const refreshData = (deleteId) => {
    console.log(deleteId)
    // setLoadingLocalidades(true);
    // setLoadingPropiedades(true);
    // setLoadingTipoPropiedades(true);
    // getData({ link: 'localidades', setData: setLocalidades, setLoading: setLoadingLocalidades });
    // getData({ link: 'propiedades', setData: setPropiedades, setLoading: setLoadingPropiedades });
    // getData({ link: 'tipos_propiedad', setData: setTipoPropiedades, setLoading: setLoadingTipoPropiedades });
    setPropiedades(propiedades => propiedades.filter(propiedad => propiedad.id !== deleteId));
  };


  useEffect((deleteId) => {
    refreshData(deleteId);
  }, []);

  return (
    <div>
      {(loadingPropiedades && loadingTipoPropiedades && loadingLocalidades) || loadingDelete ? <LoadingSpinner /> : showData(propiedades, localidades, tipoPropiedades, setLoadingDelete, refreshData, setQueryParams)}
    </div>
  )
}

export default PropiedadPage;
