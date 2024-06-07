import React, { useEffect, useState } from 'react'
import {getData} from '../../utils/const.js';
import { GridDiv, EditRedirectButton, DeleteButton } from '../../components/organisms/index.js'

function showData(data) {
  console.log(data);
  return (
    <GridDiv>
      {data.map((tipoPropiedad) => (
        <div key={tipoPropiedad.id} className="max-w-sm rounded overflow-hidden shadow-lg bg-white p-6 transition-transform transform hover:scale-105">
          <div className="flex justify-between items-center text-sm">
            <p>Tipo Propiedad: {tipoPropiedad.nombre}</p>
            <div className="flex gap-1">
              <EditRedirectButton href={`/editarTipoPropiedad/${tipoPropiedad.id}`}>Editar</EditRedirectButton>
              <DeleteButton entityId={tipoPropiedad.id} type="tipoPropiedad">Eliminar</DeleteButton>
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
  
  useEffect(() => {
    getData('tipos_propiedad',setTipoPropiedades, setLoading)
  }, []);

  return (
    <div>
        {loading ? <p>Cargando...</p> : showData(tipoPropiedades)}
    </div>
  )
}

export default TipoPropiedadPage;

//listado todos los tipos de propiedade
// botones de editar y eliminar
// boton de crear tipo de propiedad (renderiza una nueva pagina)