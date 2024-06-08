import { AlertaConfirmacionBorrado } from '../components/organisms'

// get active nav-link-class
export const getNavLinkClass = (isActive) => {
  return isActive ? 'text-lg hover:text-xl font-bold transition-all' : 'text-lg hover:text-xl hover:font-bold transition-all duration-200';
};

// warning on delete
export const triggerWarning = (id, type, setLoading) => {
  switch(type){
    case 'propiedades': AlertaConfirmacionBorrado(`Esta seguro de eliminar la propiedad ${id}`, 'borrado! (aun no hace nada)', type, id, setLoading); break;
    case 'reservas':  AlertaConfirmacionBorrado(`Esta seguro de eliminar la reserva ${id}`, 'borrado! (aun no hace nada)', type, id, setLoading); break;
    case 'tipos_propiedad': AlertaConfirmacionBorrado(`Esta seguro de eliminar el tipo de propiedad ${id}`, 'borrado! (aun no hace nada)', type, id, setLoading); break;
    default: console.log("fallo de type en triggerWarning"); break;
  }
}