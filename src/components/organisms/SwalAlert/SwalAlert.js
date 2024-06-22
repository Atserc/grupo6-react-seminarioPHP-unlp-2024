import Swal from 'sweetalert2';
import { deleteData, sendData} from '../../../utils/requests'

export default async function AlertaConfirmacionBorrado({mensaje, type, id, setLoading, onDelete, message}) {
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
        console.log(payload)
        Swal.fire({
          title: payload.error ? "Error" : "Borrado!",
          text: payload.error ? payload.error : message,
          icon: payload.error ? "error" : 'success'
        });
        if (onDelete) {
          let actualizo = payload.error ? null : onDelete(id);
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
