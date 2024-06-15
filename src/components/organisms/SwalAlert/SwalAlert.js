import Swal from 'sweetalert2';
import { deleteData, sendData} from '../../../utils/requests'

export default async function AlertaConfirmacionBorrado({mensaje, mensajeRes, type, id, setLoading, onDelete}) {
  console.log(mensaje, type, id, setLoading, 'HOL')
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
        console.log('HOLA', mensaje, type, setLoading);
        const payload = await sendData({link: `${type}/${id}`, setLoading, method: 'DELETE'});
        // const payload = await deleteData({link: `${type}/${id}`, id, setLoading: setLoading});
        console.log(payload)
        Swal.fire({
          title: payload.error ? "Error" : "Borrado!",
          text: payload.error ? payload.error : payload.data,
          icon: payload.error ? "error" : 'success'
        });
        if (onDelete) {
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
