import React from 'react'
import { Routes, Route } from 'react-router-dom'
import PropiedadPage from '../pages/propiedad/PropiedadPage'
import NewPropiedad from '../pages/propiedad/NewPropiedad'
import EditPropiedad from '../pages/propiedad/EditPropiedad'
import TipoPropiedadPage from '../pages/tipoPropiedad/TipoPropiedadPage'
import NewTipoPropiedadPage from '../pages/tipoPropiedad/NewTipoPropiedad'
import EditTipoPropiedad from '../pages/tipoPropiedad/EditTipoPropiedad'
import ReservaPage from '../pages/reserva/ReservaPage'
import NewReserva from '../pages/reserva/NewReserva'
import EditReserva from '../pages/reserva/EditReserva'
import PaginaError from '../pages/PaginaError'

import { RESERVAS_INDEX, RESERVAS_EDIT, TIPO_PROPIEDADES_INDEX, TIPO_PROPIEDADES_EDIT, TIPO_PROPIEDADES_CREATE, INDEX, PROPIEDADES_EDIT, PROPIEDADES_CREATE, RESERVAS_CREATE} from '../routes'
function MainComponent() {
  return (
    <main className='mainCSS bg-gray-500'>
      <Routes>
        <Route path={INDEX} element={<PropiedadPage />} />
        <Route path={PROPIEDADES_CREATE} element={<NewPropiedad />} />
        <Route path={PROPIEDADES_EDIT} element={<EditPropiedad />} />
        <Route path={TIPO_PROPIEDADES_INDEX} element={<TipoPropiedadPage />} />
        <Route path={TIPO_PROPIEDADES_EDIT} element={<EditTipoPropiedad />} />
        <Route path={TIPO_PROPIEDADES_CREATE} element={<NewTipoPropiedadPage />} />
        <Route path={RESERVAS_INDEX} element={<ReservaPage />} />
        <Route path={RESERVAS_CREATE} element={<NewReserva />} />
        <Route path={RESERVAS_EDIT} element={<EditReserva />} />
        <Route path="*" element={<PaginaError />} />
      </Routes>
    </main>
  )
}

export default MainComponent