export default function StyledSelect({
  children,
  options,
  entityType,
  selectedIdOption = null,
  className="p-1 rounded-md",
  label, id, name, placeholder, onChange, labelClass="block text-sm font-medium text-gray-700",
  ...props
}){
  return <>
  {(entityType === 'inquilinos') ? (
    <>
    <label htmlFor="select" className={labelClass}>{label}</label>
    <select {...props} onChange={onChange} value={selectedIdOption} className={className} id={id} name={name}>
      <option value="" disabled>Seleccione un elemento</option>
      {options.map((el)=>(  
        <option key={el.id} value={el.id}>{el.nombre} {el.apellido}</option>
        // puede ser inquilino, localidad_id, tiposPropiedad, propiedad
      ))}
    </select></>
  ): entityType==='propiedades' ? ( 
    <>
    <label htmlFor="select" className={labelClass}>{label}</label>
    <select {...props} onChange={onChange} value={selectedIdOption} className={className} id={id} name={name}>
      <option value="" disabled>Seleccione un elemento</option>
      {options.map((el)=>(
        <option key={el.id} value={el.id}>{el.domicilio}</option>
        // puede ser inquilino, localidad_id, tiposPropiedad, propiedad
      ))}
    </select>
    </>
  ) : (entityType==='tipo_propiedad' || entityType==='localidades') ? (
    <>
    <label htmlFor="select" className={labelClass}>{label}</label>
    <select {...props} onChange={onChange} value={selectedIdOption} className={className} id={id} name={name}>
      <option value="" disabled>Seleccione un elemento</option>
      {options.map((el)=>(
        <option key={el.id} value={el.id}>{el.nombre}</option>
        // puede ser inquilino, localidad_id, tiposPropiedad, propiedad
      ))}
    </select>
    </>
  ):''}</>
}