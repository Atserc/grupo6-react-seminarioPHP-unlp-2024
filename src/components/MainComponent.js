import React from 'react'
import { Routes, Route } from 'react-router-dom'
import PropiedadPage from '../pages/propiedad/PropiedadPage'
import TipoPropiedadPage from '../pages/tipoPropiedad/TipoPropiedadPage'
import ReservaPage from '../pages/reserva/ReservaPage'
import PaginaError from '../pages/PaginaError'

function MainComponent() {
  return (
    <main className='mainCSS'>
      <Routes>
        <Route path="/" element={<PropiedadPage />} />
        <Route path="/tipoPropiedades" element={<TipoPropiedadPage />} />
        <Route path="/reservas" element={<ReservaPage />} />
        <Route path="*" element={<PaginaError />} />
      </Routes>
    </main>
  )
}

export default MainComponent