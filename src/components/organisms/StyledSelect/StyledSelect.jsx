export default function StyledSelect({
  children,
  options,
  entityType,
  selectedIdOption = null,
  className="p-1 rounded-md",
  label, id, name, placeholder, onChange, required, labelClass="block text-sm font-medium text-gray-700",
  ...props
}){
  return <>
  {(entityType === 'inquilinos') ? (
    <>
    <div className="flex items-center">
      <label htmlFor={id} className={labelClass}>{label}</label>
      {required ? <p className="text-red-500">&#8226;</p> : ''}
    </div>
    <select {...props} required={required??false} onChange={onChange} value={selectedIdOption} className={className} id={id} name={name}>
      <option value="" disabled>Seleccione un elemento</option>
      {options.map((el)=>(  
        <option key={el.id} value={el.id}>{el.nombre} {el.apellido}</option>
      ))}
    </select></>
  ): entityType==='propiedades' ? ( 
    <>
    <div className="flex items-center">
      <label htmlFor={id} className={labelClass}>{label}</label>
      {required ? <p className="text-red-500">&#8226;</p> : ''}
    </div>
    <select {...props} required={required??false} onChange={onChange} value={selectedIdOption} className={className} id={id} name={name}>
      <option value="" disabled>Seleccione un elemento</option>
      {options.map((el)=>(
        <option key={el.id} value={el.id}>{el.domicilio}</option>
      ))}
    </select>
    </>
  ) : (entityType==='tipo_propiedad' || entityType==='localidades') ? (
    <>
    <div className="flex items-center">
      <label htmlFor={id} className={labelClass}>{label}</label>
      {required ? <p className="text-red-500">&#8226;</p> : ''}
    </div>
    <select {...props} required={required??false} onChange={onChange} value={selectedIdOption} className={className} id={id} name={name}>
      <option value="" disabled>Seleccione un elemento</option>
      {options.map((el)=>(
        <option key={el.id} value={el.id}>{el.nombre}</option>
      ))}
    </select>
    </>
  ) : (entityType==='disponibilidad') ? (
    <>
    <div className="flex items-center">
      <label htmlFor={id} className={labelClass}>{label}</label>
      {required ? <p className="text-red-500">&#8226;</p> : ''}
    </div>
    <select {...props} required={required??false} onChange={onChange} value={selectedIdOption} className={className} id={id} name={name}>
      {options.map((el, i) => (
       <option key={i} value={el}>{el}</option>
      ))}
      </select>
    </>
  ):''}</>
} 