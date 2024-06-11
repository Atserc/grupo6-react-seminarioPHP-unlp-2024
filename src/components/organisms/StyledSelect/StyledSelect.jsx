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
    <label htmlFor="select" className={labelClass}>{label}</label>
    <select onChange={onChange} className={className} id={id} name={name}>
      {options.map((el)=>(
        <option value={el.id}>{entityType === 'inquilinos' ? (`${el.nombre} ${el.apellido}`):el.domicilio}</option>
      ))}
    </select>
  </>
}