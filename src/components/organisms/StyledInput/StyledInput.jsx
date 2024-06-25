export default function StyledInput({
  children,
  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline", 
  type, value, label, id, name, placeholder, onChange, required, labelClass="block text-sm font-medium text-gray-700",
  ...props}){
  return <>
  <div className="flex items-center">
    <label className={labelClass} htmlFor={id}>{label}</label>
    {required ? <p className="text-red-500">&#8226;</p> : ''}
  </div>
    <input 
      className={`${className}`}
      type={type}
      id={id}
      name={name}
      placeholder={placeholder}
      value={value} 
      onChange={onChange}
      required={required ?? false}
      {...props}></input>
   </> 
}
