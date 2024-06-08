import React from 'react'
import { getData } from '../../utils/requests';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

function showData(preData) {
  console.log(preData);
  return (
    <div>
      <h1>Editar tipo de propiedad</h1>
      <form>
        <label htmlFor="nombre">Nombre</label>
        <input type="text" id="nombre" name="nombre" value="" />
        <button type="submit">Editar</button>
      </form>
    </div>
  )
}

function EditTipoPropiedad() {
  const [tipoPropiedad, setTipoPropiedad] = useState([])
  const [loading, setLoading] = useState(true);
  const {id} = useParams();

  useEffect(() => {
    getData({link:`tipos_propiedad/${id}`,setData: setTipoPropiedad, setLoading: setLoading})
  }, [id]);

  return (
    <div>
        {loading ? <p>Cargando...</p> : showData(tipoPropiedad)}
    </div>
  )
}

export default EditTipoPropiedad

// formulario precargado y mostrar mensaje del backend.
// boton de eliminar