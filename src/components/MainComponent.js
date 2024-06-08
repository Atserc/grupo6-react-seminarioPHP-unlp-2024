import React from 'react'
import { Routes, Route } from 'react-router-dom'
import PropiedadPage from '../pages/propiedad/PropiedadPage'
import EditPropiedad from '../pages/propiedad/EditPropiedad'
import TipoPropiedadPage from '../pages/tipoPropiedad/TipoPropiedadPage'
import NewTipoPropiedadPage from '../pages/tipoPropiedad/NewTipoPropiedad'
import ReservaPage from '../pages/reserva/ReservaPage'
import PaginaError from '../pages/PaginaError'
import EditTipoPropiedad from '../pages/tipoPropiedad/EditTipoPropiedad'

import { RESERVAS_INDEX, TIPO_PROPIEDADES_INDEX, TIPO_PROPIEDADES_EDIT, TIPO_PROPIEDADES_CREATE, INDEX, PROPIEDADES_EDIT} from '../routes'
function MainComponent() {
  return (
    <main className='mainCSS bg-gray-500'>
      <Routes>
        <Route path={INDEX} element={<PropiedadPage />} />
        <Route path={TIPO_PROPIEDADES_INDEX} element={<TipoPropiedadPage />} />
        <Route path={TIPO_PROPIEDADES_EDIT} element={<EditTipoPropiedad />} />
        <Route path={TIPO_PROPIEDADES_CREATE} element={<NewTipoPropiedadPage />} />
        <Route path={RESERVAS_INDEX} element={<ReservaPage />} />
        <Route path={PROPIEDADES_EDIT} element={<EditPropiedad />} />
        <Route path="*" element={<PaginaError />} />
      </Routes>
    </main>
  )
}

export default MainComponent