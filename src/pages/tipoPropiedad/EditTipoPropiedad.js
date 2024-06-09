
// // formulario precargado y mostrar mensaje del backend.
// // boton de eliminar
import { TipoPropiedadForm } from '../../components/organisms'
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { getData } from '../../utils/requests';

const EditTipoPropiedad = () => {
  const [tipoPropiedad, setTipoPropiedad] = useState([])
  const [loading, setLoading] = useState(true);
  const {id} = useParams();

  useEffect(() => {
    getData({link:`tipos_propiedad/${id}`,setData: setTipoPropiedad, setLoading: setLoading})
  }, [id]);

    return (
       <>
          {loading ? <p>Cargando...</p> : <TipoPropiedadForm
          link={`tipos_propiedad/${id}`}
          method="PUT"
          tipoPropiedad={tipoPropiedad}
          titleMessage="Editar Tipo de Propiedad"
          buttonMessage="Confirmar"
        />}
      </>
    )
}

export default EditTipoPropiedad