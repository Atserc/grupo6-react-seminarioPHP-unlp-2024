import Swal from 'sweetalert2';
import { deleteData } from '../../../utils/requests'

export default async function SwalAlert({type, id, setLoading, onDelete, message}) {
  let mensaje = "";
  switch(type){
    case 'propiedades': mensaje = `Esta seguro de eliminar la propiedad ${id}`; break;
    case 'reservas': mensaje =`Esta seguro de eliminar la reserva ${id}`; break;
    case 'tipos_propiedad': mensaje = `Esta seguro de eliminar el tipo de propiedad ${id}`; break;
    case 'localidades': mensaje = `Esta seguro de eliminar la localidad ${id}`; break;
    default: console.log("fallo de type en triggerWarning"); break;
  }
  const result = await Swal.fire({
    title: 'Está seguro?',
    text: mensaje,
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Confirmar"
  })
    if (result.isConfirmed) {
      try {
        Swal.fire({
          title: 'Borrando...',
          text: 'Por favor espere',
          icon: 'info',
          allowOutsideClick: false,
          didOpen: () => {
            Swal.showLoading();
          }
        });
        const payload = await deleteData({link: `${type}/${id}`, setLoading});
        Swal.fire({
          title: payload.error ? "Error" : "Borrado!",
          text: payload.error ? payload.error : message,
          icon: payload.error ? "error" : 'success'
        });
        // si hay ondelete, actualizo el frontend filtrando.
        if (onDelete && !payload.error) {
          onDelete(id);
        }
      } catch (error) {
        Swal.fire({
          title: "Error",
          text: error,
          icon: "error"
        });
      }
    }
  };
