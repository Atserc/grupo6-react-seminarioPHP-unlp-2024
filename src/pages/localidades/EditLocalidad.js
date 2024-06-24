import { LoadingSpinner, LocalidadForm } from '../../components/organisms'
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { getData } from '../../utils/requests';

const EditLocalidad = () => {
  const [localidad, setLocalidad] = useState([])
  const [loading, setLoading] = useState(true);
  const {id} = useParams();

  useEffect(() => {
    getData({link:`localidades/${id}`,setData: setLocalidad, setLoading: setLoading})
  }, [id]);

    return (
       <>
          {loading ? <LoadingSpinner /> : <LocalidadForm
          link={`localidades/${id}`}
          method="PUT"
          localidad={localidad}
          titleMessage="Editar localidad"
          buttonMessage="Confirmar"
        />}
      </>
    )
}

export default EditLocalidad