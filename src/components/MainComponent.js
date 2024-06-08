import React from 'react'
import { Routes, Route } from 'react-router-dom'
import PropiedadPage from '../pages/propiedad/PropiedadPage'
import TipoPropiedadPage from '../pages/tipoPropiedad/TipoPropiedadPage'
import NewTipoPropiedadPage from '../pages/tipoPropiedad/NewTipoPropiedad'
import ReservaPage from '../pages/reserva/ReservaPage'
import PaginaError from '../pages/PaginaError'
import EditTipoPropiedad from '../pages/tipoPropiedad/EditTipoPropiedad'

function MainComponent() {
  return (
    <main className='mainCSS'>
      <Routes>
        <Route path="/" element={<PropiedadPage />} />
        <Route path="/tipo-propiedades" element={<TipoPropiedadPage />} />
        <Route path="/editar-tipo-propiedad/:id" element={<EditTipoPropiedad />} />
        <Route path="/crear-tipo-propiedad" element={<NewTipoPropiedadPage />} />
        <Route path="/reservas" element={<ReservaPage />} />
        <Route path="*" element={<PaginaError />} />
      </Routes>
    </main>
  )
}

export default MainComponent