import { AlertaConfirmacionBorrado } from '../components/organisms'

// get active nav-link-class
export const getNavLinkClass = (isActive) => {
  return isActive ? 'text-lg hover:text-xl font-bold transition-all' : 'text-lg hover:text-xl hover:font-bold transition-all duration-200';
};

// warning on delete
export const triggerWarning = ({id, type, setLoading, onDelete}) => {
  switch(type){
    case 'propiedades': AlertaConfirmacionBorrado({mensaje: `Esta seguro de eliminar la propiedad ${id}`, type, id, setLoading, onDelete}); break;
    case 'reservas':  AlertaConfirmacionBorrado({mensaje:`Esta seguro de eliminar la reserva ${id}`, type, id, setLoading, onDelete}); break;
    case 'tipos_propiedad': AlertaConfirmacionBorrado({mensaje: `Esta seguro de eliminar el tipo de propiedad ${id}`, type, id, setLoading, onDelete}); break;
    default: console.log("fallo de type en triggerWarning"); break;
  }
}


export function validateEmpty(input) {
  if (input === "" || input === null || input === undefined) {
    return false;
  } else {
    return true;
  }
}

export function validate(input, tipo) {
  switch (tipo) {
    case "fecha":
      if (!/^\d{4}-\d{2}-\d{2}$/.test(input)) {
        return false;
      }
      return true;

    case "numero":
      if (!/^\d+$/.test(input)) {
        return false;
      } else if (Number(input) < 0) {
        return false;
      }
      return true;
    
    case "string":
      return true;
    
    default:
      return false;
  }
}