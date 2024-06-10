import React from 'react'
import { StyledInput, StyledSelect, SubmitButton } from '../../organisms'
export default function ReservaForm({ link, method, reserva = null, inquilinos, propiedades, titleMessage, buttonMessage}) {
  // console.log(link, method);
  // console.log(reserva, inquilinos)
  // console.log(propiedades, titleMessage, buttonMessage)
  // console.log(reserva.inquilino_id)
  return (
    <div className="flex justify-center items-center min-h-screen py-5">
      <div className="w-full max-w-2xl p-8 bg-gray-200 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold mb-6 text-center">{titleMessage}</h1>
        <form className="grid grid-cols-1 gap-6">
          <div className="grid grid-cols-2 gap-4 items-center">
           <StyledInput name="valor_total" id="valor_total" label="Precio Reserva" value={reserva? reserva.valor_total : ''} type="number"/>
           <StyledInput name="cantidad_noches" id="cantidad_noches" label="Cantidad Noches" value={reserva? reserva.cantidad_noches : ''} type="number"/>
           <StyledInput name="fecha_desde" id="fecha_desde" label="Fecha Desde" value={reserva? reserva.fecha_desde : ''} type="text"/>
           <StyledSelect selectedIdOption={reserva ? reserva.inquilino_id : ''} options={inquilinos} entityType="inquilinos" label="Seleccionar Inquilino" id="inquilino_id" placeholder="Seleccione un inquilino" />
           <StyledSelect selectedIdOption={reserva ? reserva.propiedad_id : ''} options={propiedades} entityType="propiedades" label="Seleccionar Propiedad" id="propiedad_id" placeholder="Seleccione una propiedad" />
          </div>
          <div className="flex justify-center mt-6">
          <SubmitButton text={buttonMessage} />
          </div>
        </form>
      </div>
    </div>
  )
}