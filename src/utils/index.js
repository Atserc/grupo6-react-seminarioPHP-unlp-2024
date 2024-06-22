import { AlertaConfirmacionBorrado } from '../components/organisms'

// get active nav-link-class
export const getNavLinkClass = (isActive) => {
  return isActive ? 'text-lg hover:text-xl font-bold transition-all' : 'text-lg hover:text-xl hover:font-bold transition-all duration-200';
};

// warning on delete
export const triggerWarning = ({id, type, setLoading, onDelete, message}) => {
  switch(type){
    case 'propiedades': AlertaConfirmacionBorrado({mensaje: `Esta seguro de eliminar la propiedad ${id}`, type, id, setLoading, onDelete, message}); break;
    case 'reservas':  AlertaConfirmacionBorrado({mensaje:`Esta seguro de eliminar la reserva ${id}`, type, id, setLoading, onDelete, message}); break;
    case 'tipos_propiedad': AlertaConfirmacionBorrado({mensaje: `Esta seguro de eliminar el tipo de propiedad ${id}`, type, id, setLoading, onDelete, message}); break;
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
    case "date":
      const dateParts = input.split('-');
      console.log(dateParts)
      // Reordenar fecha en formato dd/mm/yyyy
      const formattedDate = `${dateParts[0]}-${dateParts[1]}-${dateParts[2]}`;
      // console.log(formattedDate);
      if (!/^\d{4}\d{2}-\d{2}$/.test(formattedDate)) {
        // console.log('ES CORRECTO, TIENE EL Año EN LA PRIMERA POSICION')
        return true;
      } else {
        //console.log('ES INCORRECTO')
        return false;
      }
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

export function validarFormulario(data, type){
  console.log(data, type)
  switch(type){
    case 'propiedad':
      return validateEmpty(data['domicilio']) && validateEmpty(data['localidad_id']) && validateEmpty(data['localidad_id']) 
      && validate(data['cantidad_habitaciones'], 'numero') && validateEmpty(data['cantidad_banios']) && validateEmpty('cantidad_huespedes') 
      && validate(data['cantidad_huespedes'], 'numero') && validateEmpty(data['fecha_inicio_disponibilidad']) && validateEmpty(data['cantidad_dias'])
      && validate(data['cantidad_dias'], 'numero') && validateEmpty(data['valor_noche']) && validate(data['valor_noche'], 'numero') && validateEmpty(data['tipo_propiedad_id'])
    case 'reserva':
      return validateEmpty(data['propiedad_id']) && validateEmpty(data['inquilino_id']) && validateEmpty(data['fecha_desde']) && validateEmpty(data['cantidad_noches']) 
      && validate(data['cantidad_noches'], 'numero')
  }
}