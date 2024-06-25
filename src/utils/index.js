export const getNavLinkClass = (isActive) => {
  return isActive ? 'text-lg hover:text-xl font-bold transition-all' : 'text-lg hover:text-xl hover:font-bold transition-all duration-200';
};

// si esta vacio, retorna falso, si no, retorna verdadero
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
      // Reordenar fecha en formato dd/mm/yyyy
      const formattedDate = `${dateParts[0]}-${dateParts[1]}-${dateParts[2]}`;
      if (!/^\d{4}-\d{2}-\d{2}$/.test(formattedDate)) {
        return true;
      } else {
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

export function validarFormulario(data, type, messages, setMessages){
  switch(type){
    case 'propiedad':
      console.log(data);
      let newMessages = [];
      for (const [key, value] of Object.entries(data)) {
        console.log(key);
        if (key !== 'imagen' || key !== 'tipo_imagen') {
          if (!validateEmpty(value)) {
            newMessages.push(`${key} no puede estar vacío.`);
          }
        }
        if (key === 'cantidad_habitaciones' || key === 'cantidad_banios' || key === 'cantidad_huespedes' || key === 'cantidad_dias' || key === 'valor_noche') {
          if (!validate(value, 'numero')) {
            newMessages.push(`${key} debe ser un número.`);
          }
        }
        if (key === 'fecha_inicio_disponibilidad') {
          if (!validate(value, 'date')) {
            newMessages.push(`${key} debe ser una fecha válida.`);
          }
        }
      }
      console.log(newMessages);
      setMessages(newMessages);
      console.log(messages);
      return validateEmpty(data['domicilio'])
      && validateEmpty('cantidad_huespedes') && validate(data['cantidad_huespedes'], 'numero') 
      && validateEmpty(data['fecha_inicio_disponibilidad']) && validate(data['fecha_inicio_disponibilidad'], 'date')
      && validateEmpty(data['localidad_id']) 
      && validateEmpty(data['tipo_propiedad_id'])
      && validateEmpty(data['cantidad_dias'])
      && validateEmpty(data['valor_noche']) && validate(data['valor_noche'], 'numero') 
      
      && (!validateEmpty(data['cantidad_habitaciones']) ? true : validate(data['cantidad_habitaciones'], 'numero'))
      && (!validateEmpty(data['cantidad_banios']) ? true : validate(data['cantidad_banios'], 'numero'))
      && (!validateEmpty(data['cantidad_dias']) ? true : validate(data['cantidad_dias'], 'numero'))
    case 'reserva':
      return validateEmpty(data['propiedad_id']) 
      && validateEmpty(data['inquilino_id']) 
      && validateEmpty(data['fecha_desde']) 
      && validateEmpty(data['cantidad_noches']) && validate(data['cantidad_noches'], 'numero')
    default:
      console.log('Fallo de type en validarFormulario');
      return false;
  }
}