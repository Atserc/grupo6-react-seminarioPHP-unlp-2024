import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';
import { getData } from '../../utils/requests';
import { LoadingSpinner, ReservaForm } from '../../components/organisms'

// const showData = (propiedades, reserva, inquilinos) => {
//   console.log(propiedades)
//   console.log(inquilinos)
//   console.log(reserva)
//   return (
//     <ReservaForm />
//   )
// }

function EditReserva() {
  const [reserva, setReserva] = useState([])
  const [loading, setLoading] = useState(true);

  const [inquilinos, setInquilinos] = useState([])
  const [loadingI, setLoadingI] = useState(true);

  const [propiedades, setPropiedades] = useState([])
  const [loadingP, setLoadingP] = useState(true);

  const {id} = useParams();

  useEffect(() => {
    getData({link:'propiedades',setData: setPropiedades, setLoading: setLoadingP})
    getData({link:'inquilinos', setData: setInquilinos, setLoading: setLoadingI})
    getData({link:`reservas/${id}`, setData: setReserva, setLoading: setLoading})
  }, [id]);

  return (
    <div>
        {loading && loadingI && loadingP ? <LoadingSpinner /> : <ReservaForm method="PUT" propiedades={propiedades} reserva={reserva} inquilinos={inquilinos} link={`reservas/${id}`} titleMessage="Editar Reserva" buttonMessage="Confirmar cambios"/>}
    </div>
  )
}

export default EditReserva