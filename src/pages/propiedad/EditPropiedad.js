
import React from 'react'
import { getData } from '../../utils/requests';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { PropiedadForm, LoadingSpinner } from '../../components/organisms'

function EditPropiedad() {
  const [propiedad, setPropiedad] = useState([]);
  const [tipoPropiedades, setTipoPropiedades] = useState([]);
  const [localidades, setLocalidades] = useState([]);
  const [loadingPropiedad, setLoadingPropiedad] = useState(true);
  const [loadingLocalidades, setLoadingLocalidades] = useState(true);
  const [loadingTipoPropiedades, setLoadingTipoPropiedades] = useState(true);
  const {id} = useParams();

  useEffect(() => {
    getData({link:`propiedades/${id}`,setData: setPropiedad, setLoading: setLoadingPropiedad})
    getData({link:'localidades',setData: setLocalidades, setLoading: setLoadingLocalidades})
    getData({link:'tipos_propiedad',setData: setTipoPropiedades, setLoading: setLoadingTipoPropiedades})
  }, [id]);
  
  return (
    <div>
        {loadingPropiedad && loadingLocalidades && loadingTipoPropiedades ? <LoadingSpinner /> : <PropiedadForm method="PUT" propiedad={propiedad} tipoPropiedades={tipoPropiedades} localidades={localidades} link={`propiedades/${id}`} titleMessage="Editar Propiedad" buttonMessage="Confirmar cambios" />}
    </div>
  )
}

export default EditPropiedad;

// formulario precargado y mostrar mensaje del backend.