import React, { useState } from 'react';
import { validate, validateEmpty } from '../../../utils';
import { ClearButton, StyledInput, StyledSelect, SubmitButton } from '../../organisms';

export default function FilterForm({ localidades, setFiltros }) {
  const [formData, setFormData] = useState({
    cantidad_huespedes: '',
    fecha_inicio_disponibilidad: '',
    disponible: '',
    localidad_id: ''
  });
  const [errores, setErrores] = useState({ cantidad_huespedes: '', fecha_inicio_disponibilidad: '' });

  const clearFilters = () => {
    setFormData({
      cantidad_huespedes: '',
      fecha_inicio_disponibilidad: '',
      disponible: '',
      localidad_id: ''
    });
    setErrores({ cantidad_huespedes: '', fecha_inicio_disponibilidad: '' }); // Clear errors on reset
  };
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevFormData => ({
      ...prevFormData,
      [name]: name === 'cantidad_huespedes' || name === 'localidad_id'
        ? Number(value)
        : value
    }));

    // Clear specific error when the input is changed
    setErrores(prevErrores => ({
      ...prevErrores,
      [name]: '' // Clear the error for the specific input
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    let cumpleA = false;
    let cumpleB = false;

    if (validateEmpty(formData.cantidad_huespedes)) {
      if (validate(formData.cantidad_huespedes, 'numero')) {
        cumpleA = true;
        setErrores(prevErrores => ({
          ...prevErrores,
          cantidad_huespedes: '' // Clear error if valid
        }));
      } else {
        setErrores(prevErrores => ({
          ...prevErrores,
          cantidad_huespedes: 'Ingrese un número válido'
        }));
      }
    } else {
      cumpleA = true;
    }
    
    if (validateEmpty(formData.fecha_inicio_disponibilidad)) {
      if (validate(formData.fecha_inicio_disponibilidad, 'fecha')) {
        cumpleB = true;
        setErrores(prevErrores => ({
          ...prevErrores,
          fecha_inicio_disponibilidad: '' // Clear error if valid
        }));
      } else {
        setErrores(prevErrores => ({
          ...prevErrores,
          fecha_inicio_disponibilidad: 'Ingrese una fecha válida'
        }));
      }
    } else {
      cumpleB = true;
    }
    if (cumpleA && cumpleB) {
      setFiltros(formData);
    }
  };

  return (
    <form className="flex flex-wrap items-center bg-gray-400 gap-4 p-5" onSubmit={handleSubmit}>
      <StyledInput 
        onChange={handleChange} 
        name="cantidad_huespedes" 
        id="cantidad_huespedes" 
        label="Cantidad de Huéspedes:" 
        value={formData.cantidad_huespedes || ''} 
        type="number"
        className="w-[75px]" 
      />
      {/*<div className="flex items-center space-x-2">
        <label htmlFor="disponible" className="text-sm font-medium text-gray-700">Disponible:</label>
        <input 
          onChange={handleChange} 
          type="checkbox" 
          id="disponible" 
          name="disponible" 
          checked={formData.disponible} 
          className="h-5 w-5" 
        />
      </div>*/}

      <StyledSelect 
        onChange={handleChange} 
        selectedIdOption={formData.disponible || ''}
        options={["Cualquiera","Disponible","No disponible"]} 
        entityType="disponibilidad" 
        name="disponible" 
        label="Disponibilidad: " 
        id="disponible" 
        placeholder="Seleccione la disponibilidad"
        className="w-[100px] text-xs"
      />

      <StyledInput 
        onChange={handleChange} 
        name="fecha_inicio_disponibilidad" 
        id="fecha_inicio_disponibilidad" 
        label="Fecha de Inicio de Disponibilidad:" 
        value={formData.fecha_inicio_disponibilidad || ''} 
        placeholder="YYYY-MM-DD" 
        type="text"
        className="w-[125px] text-sm outline-none focus:border-0 rounded-md px-1"
      />
      <StyledSelect 
        onChange={handleChange} 
        selectedIdOption={formData.localidad_id || ''} 
        options={localidades} 
        entityType="localidades" 
        name="localidad_id" 
        label="Seleccionar localidad" 
        id="localidad_id" 
        placeholder="Seleccione una localidad"
        className="flex-grow rounded-md px-1 text-sm"
      />
      <div className='flex justify-center items-center flex-grow gap-3'>
        <ClearButton
          onClick={clearFilters}
          text="Borrar Filtros"
        />
        <SubmitButton 
          onClick={handleSubmit} 
          text="Filtrar"
          className="bg-white text-zinc-900 hover:bg-green-600 transition hover:text-white hover:shadow-lg px-3 py-1 text-sm rounded-md"
        />
      </div>
      <p className={errores.cantidad_huespedes !== '' ? 'text-red-500' : 'hidden'}>
        {errores.cantidad_huespedes}
      </p>
      <p className={errores.fecha_inicio_disponibilidad !== '' ? 'text-red-500' : 'hidden'}>
        {errores.fecha_inicio_disponibilidad}
      </p>
    </form>
  );
}
