import React, { useState, useEffect } from 'react';
import { getData } from '../../utils/requests';
import { useParams } from 'react-router-dom';
import { PropiedadForm, LoadingSpinner } from '../../components/organisms'

function NewPropiedad() {
  const [tipoPropiedades, setTipoPropiedades] = useState([]);
  const [localidades, setLocalidades] = useState([]);
  const [loadingLocalidades, setLoadingLocalidades] = useState(true);
  const [loadingTipoPropiedades, setLoadingTipoPropiedades] = useState(true);
  const {id} = useParams();

  useEffect(() => {
    getData({link:'localidades',setData: setLocalidades, setLoading: setLoadingLocalidades})
    getData({link:'tipos_propiedad',setData: setTipoPropiedades, setLoading: setLoadingTipoPropiedades})
  }, [id]);
  
  return (
    <div>
        {loadingLocalidades && loadingTipoPropiedades ? <LoadingSpinner /> : <PropiedadForm method="POST" tipoPropiedades={tipoPropiedades} localidades={localidades} link='propiedades' titleMessage="Crear Propiedad" buttonMessage="Agregar" />}
    </div>
  )
}

export default NewPropiedad;

// formulario precargado y mostrar mensaje del backend.