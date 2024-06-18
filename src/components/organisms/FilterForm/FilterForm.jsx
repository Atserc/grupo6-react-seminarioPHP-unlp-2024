import React, { useState } from 'react';
import { ClearButton, StyledInput, StyledSelect, SubmitButton } from '../../organisms';

export default function FilterForm({ localidades, setFiltros }) {
  const [formData, setFormData] = useState({
    cantidad_huespedes: '',
    fecha_inicio_disponibilidad: '',
    disponible: '',
    localidad_id: ''
  });

  const clearFilters = () => {
    setFormData({
      cantidad_huespedes: '',
      fecha_inicio_disponibilidad: '',
      disponible: '',
      localidad_id: ''
    });
  };
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevFormData => ({
      ...prevFormData,
      [name]: name === 'cantidad_huespedes' || name === 'localidad_id'
        ? Number(value)
        : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFiltros(formData);
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
        className="flex-grow" 
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
        className="flex-grow"
      />

      <StyledInput 
        onChange={handleChange} 
        name="fecha_inicio_disponibilidad" 
        id="fecha_inicio_disponibilidad" 
        label="Fecha de Inicio de Disponibilidad:" 
        value={formData.fecha_inicio_disponibilidad || ''} 
        placeholder="YYYY-MM-DD" 
        type="text"
        className="flex-grow"
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
        className="flex-grow"
      />
      <div className='flex justify-center items-center flex-grow gap-3'>
        <SubmitButton 
          onClick={handleSubmit} 
          text="Filtrar"
          className="bg-gray-700 text-white p-2 rounded-md"
        />

        <ClearButton
          onClick={clearFilters}
          text="Borrar Filtros"
        />
      </div>
    </form>
  );
}
