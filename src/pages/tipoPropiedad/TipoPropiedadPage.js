import React, { useEffect, useState } from 'react'
import {getData} from '../../utils/index.js';
import { GridDiv, EditRedirectButton, DeleteButton } from '../../components/organisms/index.js'
import { Link } from 'react-router-dom';

function showData(data, setLoading, setData, loading, response) {
  console.log(data);
  return (
    <GridDiv>
      {data.map((tipoPropiedad) => (
        <div key={tipoPropiedad.id} className="max-w-sm rounded overflow-hidden shadow-lg bg-white p-6 transition-transform transform hover:scale-105">
          <div className="flex justify-between items-center text-sm">
            <p>Tipo Propiedad: {tipoPropiedad.nombre}</p>
            <div className="flex gap-1">
              <DeleteButton entityId={tipoPropiedad.id} type="tipos_propiedad" setLoading={setLoading} data={response} setData={setData} loading={loading}>Eliminar</DeleteButton>
              <EditRedirectButton> <Link to={`/editar-tipo-propiedad/${tipoPropiedad.id}`}> Editar </Link> </EditRedirectButton>
            </div>
          </div>
        </div>
      ))}
    </GridDiv>
  )
}

function TipoPropiedadPage() {
  const [tipoPropiedades, setTipoPropiedades] = useState([])
  const [loading, setLoading] = useState(true);
  const [response, setData] = useState();

  useEffect(() => {
    getData({link:'tipos_propiedad',setData: setTipoPropiedades, setLoading: setLoading})
  }, []);

  return (
    <div>
        {loading ? <p>Cargando...</p> : showData(tipoPropiedades, setLoading, setData, loading, response)}
    </div>
  )
}

export default TipoPropiedadPage;

//listado todos los tipos de propiedade
// botones de editar y eliminar
// boton de crear tipo de propiedad (renderiza una nueva pagina)