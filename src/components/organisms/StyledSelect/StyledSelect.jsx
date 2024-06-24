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
    <label htmlFor={id} className={labelClass}>{label}</label>
    <select {...props} onChange={onChange} value={selectedIdOption} className={className} id={id} name={name}>
      <option value="" disabled>Seleccione un elemento</option>
      {options.map((el)=>(  
        <option key={el.id} value={el.id}>{el.nombre} {el.apellido}</option>
      ))}
    </select></>
  ): entityType==='propiedades' ? ( 
    <>
    <label htmlFor={id} className={labelClass}>{label}</label>
    <select {...props} onChange={onChange} value={selectedIdOption} className={className} id={id} name={name}>
      <option value="" disabled>Seleccione un elemento</option>
      {options.map((el)=>(
        <option key={el.id} value={el.id}>{el.domicilio}</option>
      ))}
    </select>
    </>
  ) : (entityType==='tipo_propiedad' || entityType==='localidades') ? (
    <>
    <label htmlFor={id} className={labelClass}>{label}</label>
    <select {...props} onChange={onChange} value={selectedIdOption} className={className} id={id} name={name}>
      <option value="" disabled>Seleccione un elemento</option>
      {options.map((el)=>(
        <option key={el.id} value={el.id}>{el.nombre}</option>
      ))}
    </select>
    </>
  ) : (entityType==='disponibilidad') ? (
    <>
    <label htmlFor={id} className={labelClass}>{label}</label>
    <select {...props} onChange={onChange} value={selectedIdOption} className={className} id={id} name={name}>
      {options.map((el, i) => (
       <option key={i} value={el}>{el}</option>
      ))}
      </select>
    </>
  ):''}</>
} 