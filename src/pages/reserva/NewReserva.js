import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';
import { getData } from '../../utils/requests';
import { LoadingSpinner, ReservaForm } from '../../components/organisms'

function NewReserva() {
  const [inquilinos, setInquilinos] = useState([])
  const [loadingI, setLoadingI] = useState(true);

  const [propiedades, setPropiedades] = useState([])
  const [loadingP, setLoadingP] = useState(true);

  const {id} = useParams();

  useEffect(() => {
    getData({link:'propiedades',setData: setPropiedades, setLoading: setLoadingP})
    getData({link:'inquilinos', setData: setInquilinos, setLoading: setLoadingI})
  }, [id]);

  return (
    <div>
        {loadingI && loadingP ? <LoadingSpinner /> : <ReservaForm method="POST" propiedades={propiedades} inquilinos={inquilinos} link="reservas" titleMessage="Crear Reserva" buttonMessage="Confirmar Reserva"/>}
    </div>
  )
}

export default NewReserva