import React, { useState, useEffect } from 'react';
import { StyledInput, StyledSelect, SubmitButton } from '../../organisms';

export default function FilterForm({ propiedad = null, localidades, setQueryParams }) {
  const [formData, setFormData] = useState({
    cantidad_huespedes: '',
    fecha_inicio_disponibilidad: '',
    disponible: false,
    localidad_id: ''
  });

  useEffect(() => {
    if (propiedad) {
      setFormData({
        ...formData,
        cantidad_huespedes: propiedad.cantidad_huespedes || '',
        fecha_inicio_disponibilidad: propiedad.fecha_inicio_disponibilidad || '',
        disponible: propiedad.disponible === 1,
        localidad_id: propiedad.localidad_id || ''
      });
    }
  }, [propiedad]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevFormData => ({
      ...prevFormData,
      [name]: name === 'cantidad_huespedes' || name === 'localidad_id'
        ? Number(value)
        : name === 'disponible'
          ? e.target.checked
          : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setQueryParams(formData);
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
      <div className="flex items-center space-x-2">
        <label htmlFor="disponible" className="text-sm font-medium text-gray-700">Disponible:</label>
        <input 
          onChange={handleChange} 
          type="checkbox" 
          id="disponible" 
          name="disponible" 
          checked={formData.disponible} 
          className="h-5 w-5" 
        />
      </div>
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
      <div className='flex justify-center items-center flex-grow'>
        <SubmitButton 
          onClick={handleSubmit} 
          text="Filtrar"
          className="bg-gray-700 text-white p-2 rounded-md"
        />
      </div>
    </form>
  );
}
