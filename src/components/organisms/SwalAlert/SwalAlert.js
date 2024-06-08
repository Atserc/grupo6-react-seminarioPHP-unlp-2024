import Swal from 'sweetalert2';
import { deleteData } from '../../../utils/requests'

export default async function AlertaConfirmacionBorrado(mensaje,mensajeConfirm, type, id, setLoading) {
  const result = await Swal.fire({
    title: "Esta seguro que desea borrar?",
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
        const payload = await deleteData({link: `${type}/${id}`, id, setLoading: setLoading});
        Swal.fire({
          title: payload.error ? "Error" : "Borrado!",
          text: payload.error ? payload.error : payload.data,
          icon: payload.error ? "error" : 'success'
        });
      } catch (error) {
        Swal.fire({
          title: "Error",
          text: error,
          icon: "error"
        });
      }
    }
  };
